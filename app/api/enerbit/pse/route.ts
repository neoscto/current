export const maxDuration = 30;
export const dynamic = 'force-dynamic';

import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  try {
    const { cupsCode, WEBTOKEN } = body;

    const response = await axios.get(
      `https://data.enerbit.es/api/sips/pse/?cups=${cupsCode}&replace=true`,
      {
        headers: {
          WEBTOKEN: WEBTOKEN // Assuming WEBTOKEN is a string
        }
      }
    );

    if (response.status === 200) {
      //   res.status(200).json(response.data);
      return new NextResponse(JSON.stringify(response.data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    } else {
      //   res.status(500).json({ error: 'Failed to fetch data' });
      return new NextResponse(
        JSON.stringify({ error: 'Failed to fetch data' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  } catch (error: any) {
    // console.error('Proxy error:', error);
    let json_response = {
      status: 'error',
      message: error.message
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
