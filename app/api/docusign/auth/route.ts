import { createErrorResponse, stringToObjectId } from "@/lib/api-response";
import {
  authenticate,
  createEnvelope,
  getEmbeddedSigningUrl,
} from "@/services/docusign.service";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
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
    // const accessToken = await authenticate(code as string);
    const accessToken = process.env.NEXT_PUBLIC_DOCUSIGN_API_TOKEN || "";
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
