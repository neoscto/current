import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
var axios = require("axios").default;
const clientId = process.env.NEXT_PUBLIC_CALENDLY_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_CALENDLY_CLIENT_SECRET;
const redirectUrl = process.env.NEXT_PUBLIC_CALENDLY_REDIRECT_URL;

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const code = searchParams.get("code") || "";
    const authHeader = `Basic ${Buffer.from(
      `${clientId}:${clientSecret}`
    ).toString("base64")}`;
    var options = {
      method: "POST",
      url: "https://auth.calendly.com/oauth/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authHeader,
      },
      data: {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUrl,
      },
    };
    const response = await axios.request(options);
    return NextResponse.json({ token: response.data.access_token });
  } catch (error) {
    return NextResponse.json({ message: error, status: 500 });
  }
}
