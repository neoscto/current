import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  console.log('here');
  const body = await req.json();
  console.log(body); // Make sure you're receiving the body properly
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
    console.log(response.data);
    if (response.status === 200) {
      //   res.status(200).json(response.data);
      return new NextResponse(JSON.stringify(response.data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
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
