export const maxDuration = 60;
export const dynamic = 'force-dynamic';

import { createErrorResponse } from '@/lib/api-response';
import connectDB from '@/lib/connect-db';
import {
  createEnvelope,
  getEmbeddedSigningUrl
} from '@/services/docusign.service';
// import { POWER_PRICES } from '@/utils/utils';
import {
  fetchData,
  processConsumptionData
} from '@/features/calculateSolarPaybackPeriod';
import * as jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { formatNumber } from '@/lib/utils';
import { stringToObjectId } from '@/lib/api-response';
import { UserOffer, UserOfferSchemaProps } from '@/models/UsersOffers';

const createOrUpdateUserOffer = async (
  offerData: UserOfferSchemaProps,
  offerId?: string
) => {
  try {
    if (!offerData.user) throw new Error("User can't be empty 😔");
    if (offerId) {
      const existingUserOffer = await UserOffer.findByIdAndUpdate(
        stringToObjectId(offerId),
        { $set: offerData },
        { new: true }
      )
        .lean()
        .exec();
      return existingUserOffer;
    }
    const userOffer = await UserOffer.create(offerData);
    return userOffer;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating user offer 😔');
  }
};

enum PLAN_TYPE {
  Neos = 'neos',
  Current = 'current'
}

type ConsumptionData = {
  tabLabel: string;
  value: string;
};

interface PlanInformation {
  cups: string;
  typeConsumption: string;
  powerConsumptionData: Array<ConsumptionData>;
}

const getPlanInformation = async (
  offerData: any,
  paybackData: any
): Promise<PlanInformation> => {
  if (offerData.plan === PLAN_TYPE.Neos) {
    const { consumption_data } = await fetchData(offerData.cups);
    const processData: any = processConsumptionData(consumption_data);
    const typeConsumption = paybackData.typeConsumption;
    const orderedKeys = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];
    const powerConsumptionData = orderedKeys.map((key) => {
      const sum = processData[key].reduce(
        (val: number, acc: number) => acc + val,
        0
      );
      const value = `${formatNumber(sum / 1000, 5)} kWp`;
      return { tabLabel: key.toLowerCase(), value };
    });

    return { cups: offerData.cups, typeConsumption, powerConsumptionData };
  }
  return { cups: '', typeConsumption: '', powerConsumptionData: [] };
};

const getLabelInformation = (label: string, length: number, value: string) => {
  return new Array(length).fill(value).map((_, index) => ({
    tabLabel: `${label}${index + 1}`,
    value
  }));
};

const generateEnvelopeData = async (offerData: any) => {
  if (offerData.offerId && offerData._id) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users-offers/${offerData.offerId}`
    );
    const { userOffer: paybackData } = await response.json();
    const { cups, typeConsumption, powerConsumptionData } =
      await getPlanInformation(offerData, paybackData);

    const fullNameList = getLabelInformation(
      'fullName',
      6,
      `${offerData.firstName} ${offerData.lastName}`
    );
    const nieList = getLabelInformation('nie', 3, offerData.nie);
    const addressList = getLabelInformation('address', 3, offerData.address);
    const phoneNumberList = getLabelInformation(
      'phoneNumber',
      2,
      offerData.phoneNumber
    );

    const envelopeData = {
      status: 'sent',
      emailSubject: 'Please sign this document',
      templateId:
        offerData.plan === 'neos'
          ? process.env.NEOS_TEMPLATE_ID
          : process.env.CURRENT_TEMPLATE_ID,
      templateRoles: [
        {
          clientUserId: offerData._id,
          name: offerData.firstName,
          email: offerData.emailAddress,
          roleName: 'Signer1',
          tabs: {
            textTabs: [
              ...fullNameList,
              ...nieList,
              ...addressList,
              ...phoneNumberList,
              {
                tabLabel: 'lastName',
                value: offerData.lastName
              },
              {
                tabLabel: 'totalPanels',
                value: formatNumber(paybackData.totalPanels)
              },
              {
                tabLabel: 'capacityPerPanel',
                value: paybackData.capacityPerPanel
              },
              {
                tabLabel: 'totalCapacity',
                value: `${formatNumber(paybackData.totalCapacity)} kWp`
              },
              {
                tabLabel: 'estimateProduction',
                value: `${formatNumber(paybackData.estimateProduction * 25)} kWh`
              },
              {
                tabLabel: 'totalPayment',
                value: formatNumber(paybackData.totalPayment)
              },
              // {
              //   tabLabel: 'cups',
              //   value: cups
              // },
              // {
              //   tabLabel: 'typeConsumption',
              //   value: typeConsumption
              // },
              {
                tabLabel: 'addressNo',
                value: offerData.addressNo
              },
              {
                tabLabel: 'city',
                value: offerData.city
              },
              {
                tabLabel: 'postcode',
                value: offerData.postcode
              },
              {
                tabLabel: 'province',
                value: offerData.province
              },
              {
                tabLabel: 'country',
                value: 'Spain'
              }
              // ...powerConsumptionData
            ]
          }
        }
      ]
    };
    return envelopeData;
  }
};

// const updateEnvelopeId = async (id: string, envelopeId: string) => {
//   const parsedId = stringToObjectId(id);
//   return await UsersOffers.findByIdAndUpdate(
//     parsedId,
//     { envelopeId },
//     {
//       new: true
//     }
//   )
//     .lean()
//     .exec();
// };

export async function POST(_request: Request, _response: Response) {
  try {
    await connectDB();
    const body = await _request.json();
    // const code = body.code;
    const offerData = body.offerData;
    const accessToken: string = await getAccessToken();
    // const accessToken = process.env.NEXT_PUBLIC_DOCUSIGN_API_TOKEN || "";
    const envelopeData = await generateEnvelopeData(offerData);
    const envelopeId = await createEnvelope(accessToken, envelopeData);
    const signingUrl = await getEmbeddedSigningUrl(
      accessToken,
      envelopeId,
      offerData
    );
    await createOrUpdateUserOffer(
      { user: offerData._id, envelopeId },
      offerData.offerId
    );
    return new NextResponse(
      JSON.stringify({ signingUrl, envelopeId, accessToken }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error: any) {
    if (typeof error === 'string' && error.includes('Data not found')) {
      return createErrorResponse('Data not found', 404);
    }

    return createErrorResponse(error.message, 500);
  }
}

const getAccessToken = async () => {
  const iat = Math.floor(Date.now() / 1000);
  const payload = {
    // iss: 'cc82c409-08f6-4fe1-bdd3-03fb28efd21e',
    iss: process.env.NEXT_PUBLIC_DOCUSIGN_INTEGRATION_KEY,
    // sub: '0d895940-2603-4e3a-94e2-e4687fcc2da0',
    sub: process.env.NEXT_PUBLIC_DOCUSIGN_USER_ID,
    aud: process.env.NEXT_PUBLIC_DOCUSIGN_ACCOUNT,
    iat: iat,
    exp: iat + 3600,
    scope: 'signature'
  };

  const privateKeyBuffer = Buffer.from(
    process.env.DOCUSIGN_PRIVATE_KEY!,
    'base64'
  ).toString('ascii');
  const header = {
    alg: 'RS256', // Algorithm used for signing (RSA with SHA-256)
    typ: 'JWT' // Type of token
  };
  const tokenAssertion = jwt.sign(payload, privateKeyBuffer, { header });

  const tokenResponse = await fetch(
    `https://${process.env.NEXT_PUBLIC_DOCUSIGN_ACCOUNT}/oauth/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${tokenAssertion}`
    }
  );
  const token = await tokenResponse.json();
  return token.access_token;
};
