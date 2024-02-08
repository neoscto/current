import { createErrorResponse, stringToObjectId } from "@/lib/api-response";
import {
  authenticate,
  createEnvelope,
  getEmbeddedSigningUrl,
} from "@/services/docusign.service";
import { NextResponse } from "next/server";
import * as jwt from 'jsonwebtoken'
import * as fs from 'fs';
import path from 'path';
import { UsersOffers } from "@/models/UsersOffers";
import jsPDF from "jspdf";
import connectDB from "@/lib/connect-db";

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
  const pdfData = (pdf.output("dataurlstring") as string) || "";
  return pdfData.split(",")[1] || "";
};

const generateEnvelopeData = (offerData: any) => {
  const pdfDataUrl = pdfGenerate(offerData);
  const envelopeData = {
    status: 'sent',
    emailSubject: 'Please sign this document',
    documents: [
      {
        documentBase64: Buffer.from('<html><body>Your contract content here /sn1/</body></html>').toString('base64'),
        name: 'DocumentName.html',
        fileExtension: 'html',
        documentId: '1',
      },
    ],
    recipients: {
      signers: [
        {
          email: offerData.emailAddress,
          name: offerData.firstName,
          recipientId: '1',
          clientUserId: '1002',
          smsAuthentication: {
            senderProvidedNumbers: [
              `+44${offerData.phoneNumber}`,
            ]
          },
          "identityVerification": {
            "workflowId": "c368e411-1592-4001-a3df-dca94ac539ae",
            "inputOptions": [
              {
                "name": "phone_number_list",
                "valueType": "PhoneNumberList",
                "phoneNumberList": [
                  {
                    "countryCodeLock": false,
                    "countryCode": "44",
                    "number": offerData.phoneNumber,
                    "extension": "44"
                  }
                ]
              }
            ]
          },
          tabs: {
            signHereTabs: [
              {
                anchorString: '/sn1/',
                anchorXOffset: '20',
                anchorYOffset: '10',
              },
            ],
          },
        },
      ],
    },
  };
  return envelopeData;
};

const updateEnvelopeId = async (id: string, envelopeId: string) => {
  const parsedId = stringToObjectId(id);
  return await UsersOffers.findByIdAndUpdate(
    parsedId,
    { envelopeId },
    {
      new: true,
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
    const accessToken: string = await getAccessToken();
    // const accessToken = process.env.NEXT_PUBLIC_DOCUSIGN_API_TOKEN || "";
    const envelopeData = generateEnvelopeData(offerData);

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
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    if (typeof error === "string" && error.includes("Data not found")) {
      return createErrorResponse("Data not found", 404);
    }

    return createErrorResponse(error.message, 500);
  }
}

const getAccessToken = async () => {

  const iat = Math.floor(Date.now() / 1000);
  const payload = {
    "iss": "cc82c409-08f6-4fe1-bdd3-03fb28efd21e",
    "sub": "0d895940-2603-4e3a-94e2-e4687fcc2da0",
    "aud": "account-d.docusign.com",
    "iat": iat,
    "exp": iat + 3600,
    "scope": "signature"
  }
  const privateKeyBuffer = fs.readFileSync(path.join(process.cwd(), 'app/api/docusign/auth/private.key'));
  const header = {
    alg: 'RS256', // Algorithm used for signing (RSA with SHA-256)
    typ: 'JWT',   // Type of token
  };
  const tokenAssertion = jwt.sign(payload, privateKeyBuffer, { header });

  const tokenResponse = await fetch('https://account-d.docusign.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${tokenAssertion}`
  });
  const token = await tokenResponse.json();
  return token.access_token;

}