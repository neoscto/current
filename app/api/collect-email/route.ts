import connectDB from '@/lib/connect-db';
import { PreSaleUser } from '@/models/PresaleUser';
import { NextResponse } from 'next/server';

export async function POST(_request: Request, _response: Response) {
  const body = await _request.json();

  // console.log(body);
  const { input } = body;
  let userData = {
    email: null,
    phoneNumber: null
  };

  if (input.includes('@')) {
    userData.email = input;
  } else {
    // Assuming it's a phone number, you can add further validation if needed
    userData.phoneNumber = input;
  }

  try {
    await connectDB();
    // Create a new user document
    const newUser = await PreSaleUser.create({ user: input });
    // Save the user to the database

    let json_response = {
      status: 'success',
      data: newUser
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    // Return error response
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

export async function OPTIONS(request: Request) {
  const allowedOrigin = request.headers.get('origin');
  const response = new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin || '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
      'Access-Control-Max-Age': '86400'
    }
  });

  return response;
}
