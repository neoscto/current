import { createErrorResponse } from "@/lib/api-response";
import {
  authenticate,
  createEnvelope,
  getEmbeddedSigningUrl,
} from "@/services/docusign.service";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const getDataFromFile = (): any => {
  const filePath = path.join(process.cwd(), "pdfs/test.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
};

const generateEnvelopeData = (offerData: any) => {
  const filePath = path.join(process.cwd(), "pdfs/test.pdf");
  const documentBase64 = fs.readFileSync(filePath, "base64");
  const envelopeData = {
    emailSubject: "Please sign this document",
    documents: [
      {
        documentBase64: documentBase64,
        documentId: "1",
        fileExtension: "pdf",
        name: "Document.pdf",
      },
    ],
    recipients: {
      signers: [
        {
          email: offerData.emailAddress,
          name: offerData.firstName,
          recipientId: "1",
          tabs: {
            signHereTabs: [
              {
                documentId: "1",
                pageNumber: "1",
                xPosition: "100",
                yPosition: "100",
              },
            ],
          },
        },
      ],
    },
    status: "sent",
  };
  return envelopeData;
};

export async function POST(_request: Request, _response: Response) {
  try {
    const body = await _request.json();
    const code = body.code;
    const offerData = body.offerData;
    const accessToken = await authenticate(code as string);
    const envelopeData = generateEnvelopeData(offerData);

    const envelopeId = await createEnvelope(accessToken, envelopeData);
    const signingUrl = await getEmbeddedSigningUrl(
      accessToken,
      envelopeId,
      offerData
    );

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
