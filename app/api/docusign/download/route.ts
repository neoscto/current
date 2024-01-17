import { createErrorResponse } from "@/lib/api-response";
import axios, { AxiosResponse } from "axios";
import { headers } from "next/headers";

const apiUri = process.env.NEXT_PUBLIC_DOCUSIGN_API_URL;

export async function GET(_request: Request, _response: Response) {
  const docChoice = 1;
  const outputFile = "document";
  const outputFileExtension = "pdf";
  const { searchParams } = new URL(_request.url);
  const envelopeId = searchParams.get("envelopeId");
  const headersList = headers();
  const docusignAccessToken = headersList.get("authorization");

  const url = `${apiUri}/restapi/v2/accounts/me/envelopes/${envelopeId}/documents/${docChoice}`;

  try {
    const response: AxiosResponse<ArrayBuffer> = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${docusignAccessToken}`,
      },
      responseType: "arraybuffer", // This ensures that Axios returns a buffer for binary data
    });

    const fileBuffer = Buffer.from(response.data as any, "binary");

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename=${outputFile}.${outputFileExtension}`,
      },
    });
  } catch (error: any) {
    console.error("Error:", error);
    return createErrorResponse(error.message, 500);
  }
}
