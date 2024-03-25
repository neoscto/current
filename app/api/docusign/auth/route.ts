import { getTechnicalDataFromApi } from '@/features/calculateSolarPaybackPeriod';
import { createErrorResponse, stringToObjectId } from '@/lib/api-response';
import connectDB from '@/lib/connect-db';
import { UsersOffers } from '@/models/UsersOffers';
import {
  createEnvelope,
  getEmbeddedSigningUrl
} from '@/services/docusign.service';
import { POWER_PRICES } from '@/utils/utils';
import * as jwt from 'jsonwebtoken';
import jsPDF from 'jspdf';
import { NextResponse } from 'next/server';

const pdfGenerate = (formData: any): string => {
  const pdf = new jsPDF();
  if (formData?.numberOfPeople) {
    pdf.text(`Number of People: ${formData.numberOfPeople}`, 20, 20);
  } else {
    pdf.text(`Number of People: ${formData.cups}`, 20, 20);
  }
  pdf.text(`First Name: ${formData.firstName}`, 20, 30);
  pdf.text(`Last Name: ${formData.lastName}`, 20, 40);
  pdf.text(`Email Address: ${formData.emailAddress}`, 20, 50);
  pdf.text(`Phone Number: ${formData.phoneNumber}`, 20, 60);
  const pdfData = (pdf.output('dataurlstring') as string) || '';
  return pdfData.split(',')[1] || '';
};

const generateEnvelopeData = async (offerData: any, paybackData: any) => {
  let typeConsumption: string | undefined;
  if (paybackData.typeConsumption) {
    typeConsumption = paybackData.typeConsumption;
  } else {
    const technicalData = await getTechnicalDataFromApi(offerData.cups);
    typeConsumption = technicalData?.tipoPerfilConsumo.slice(1).toUpperCase();
  }

  // const typeConsumption = paybackData.typeConsumption;
  const powerConsumptionData = typeConsumption
    ? [
        {
          tabLabel: 'p1',
          value: POWER_PRICES[typeConsumption]['P1']
        },
        {
          tabLabel: 'p2',
          value: POWER_PRICES[typeConsumption]['P2']
        },
        {
          tabLabel: 'p3',
          value: POWER_PRICES[typeConsumption]['P3']
        },
        {
          tabLabel: 'p4',
          value: POWER_PRICES[typeConsumption]['P4']
        },
        {
          tabLabel: 'p5',
          value: POWER_PRICES[typeConsumption]['P5']
        },
        {
          tabLabel: 'p6',
          value: POWER_PRICES[typeConsumption]['P6']
        }
      ]
    : [];
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
            {
              tabLabel: 'lastName',
              value: offerData.lastName
            },

            {
              tabLabel: 'nie1',
              value: offerData.nie
            },
            {
              tabLabel: 'nie2',
              value: offerData.nie
            },
            {
              tabLabel: 'nie3',
              value: offerData.nie
            },
            {
              tabLabel: 'address1',
              value: offerData.address
            },
            {
              tabLabel: 'address2',
              value: offerData.address
            },
            {
              tabLabel: 'address3',
              value: offerData.address
            },
            {
              tabLabel: 'phoneNumber1',
              value: offerData.phoneNumber
            },
            {
              tabLabel: 'phoneNumber2',
              value: offerData.phoneNumber
            },
            {
              tabLabel: 'totalPanels',
              value: paybackData.totalPanels.toFixed(2).toString()
            },
            {
              tabLabel: 'capacityPerPanel',
              value: paybackData.capacityPerPanel
            },
            {
              tabLabel: 'totalCapacity',
              value: `${paybackData.totalCapacity.toFixed(2).toString()} kWp`
            },
            {
              tabLabel: 'estimateProduction',
              value: `${paybackData.estimateProduction.toFixed(2).toString()} kWh`
            },
            {
              tabLabel: 'totalPayment',
              value: paybackData.totalPayment.toFixed(2).toString()
            },
            {
              tabLabel: 'cups',
              value: offerData.cups
            },
            {
              tabLabel: 'typeConsumption',
              value: typeConsumption
            },
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
            },
            ...powerConsumptionData
          ]
        }
      }
    ]
    // documents: [
    //   {
    //     documentBase64: Buffer.from(
    //       '<html><body>Your contract content here /sn1/</body></html>'
    //     ).toString('base64'),
    //     name: 'Test.html',
    //     fileExtension: 'html',
    //     documentId: '1'
    //   }
    // ],
    // recipients: {
    //   signers: [
    //     {
    //       email: offerData.emailAddress,
    //       name: offerData.firstName,
    //       recipientId: '1',
    //       clientUserId: '1002',
    //       smsAuthentication: {
    //         senderProvidedNumbers: [`${offerData.phoneNumber}`]
    //       },
    //       identityVerification: {
    //         workflowId: 'c368e411-1592-4001-a3df-dca94ac539ae',
    //         inputOptions: [
    //           {
    //             name: 'phone_number_list',
    //             valueType: 'PhoneNumberList',
    //             phoneNumberList: [
    //               {
    //                 countryCodeLock: false,
    //                 countryCode: offerData.dialCode,
    //                 number: offerData.phoneNumber,
    //                 extension: offerData.dialCode
    //               }
    //             ]
    //           }
    //         ]
    //       },
    //       tabs: {
    //         signHereTabs: [
    //           {
    //             anchorString: '/sn1/',
    //             anchorXOffset: '20',
    //             anchorYOffset: '10'
    //           }
    //         ]
    //       }
    //     }
    //   ]
    // }
  };
  return envelopeData;
};

const updateEnvelopeId = async (id: string, envelopeId: string) => {
  const parsedId = stringToObjectId(id);
  return await UsersOffers.findByIdAndUpdate(
    parsedId,
    { envelopeId },
    {
      new: true
    }
  )
    .lean()
    .exec();
};

export async function POST(_request: Request, _response: Response) {
  try {
    await connectDB();
    const body = await _request.json();
    // const code = body.code;
    const offerData = body.offerData;
    const paybackData = body.paybackData;
    const accessToken: string = await getAccessToken();
    // const accessToken = process.env.NEXT_PUBLIC_DOCUSIGN_API_TOKEN || "";
    const envelopeData = await generateEnvelopeData(offerData, paybackData);

    const envelopeId = await createEnvelope(accessToken, envelopeData);
    const signingUrl = await getEmbeddedSigningUrl(
      accessToken,
      envelopeId,
      offerData
    );
    await updateEnvelopeId(offerData._id, envelopeId);
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
