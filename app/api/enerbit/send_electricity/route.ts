export const maxDuration = 30;
export const dynamic = 'force-dynamic';

import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  try {
    const response = await axios.post(
      'https://neo-cli.002.enerbit.es/api/contract/',
      body,
      {
        headers: {
          Authorization: `Bearer ${process.env.ENERBIT_ELECTRICITY_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.status === 201) {
      return new NextResponse(JSON.stringify(response.data), {
        status: 201
      });
    } else {
      return new NextResponse(
        JSON.stringify({ error: 'Failed to fetch data' }),
        {
          status: 500
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
