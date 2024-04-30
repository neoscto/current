export const maxDuration = 30;
export const dynamic = 'force-dynamic';

import { createOrUpdateUserOffer } from '@/lib/actions/user-offer';
import { createErrorResponse } from '@/lib/api-response';
import connectDB from '@/lib/connect-db';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    if (!body.emailAddress) {
      return createErrorResponse('Email is required', 400);
    }
    // generate 8 character random string for referral code
    const codeString = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
    let referralCode = '';
    for (let i = 0; i < 8; i++) {
      referralCode += codeString.charAt(
        Math.floor(Math.random() * codeString.length)
      );
    }
    const requestBody: any = {
      _id: body._id,
      emailAddress: body.emailAddress,
      firstName: body.firstName,
      lastName: body.lastName,
      dialCode: body.dialCode,
      phoneNumber: body.phoneNumber,
      cups: body.cups,
      referralCode: referralCode
      // numberOfPeople: body.numberOfPeople
    };
    // Create User Offer
    const offer = await createOrUpdateUserOffer(requestBody);
    if (!offer) {
      return createErrorResponse('Error creating offer', 500);
    }
    const safeOffer = {
      _id: offer._id,
      cups: offer.cups,
      emailAddress: offer.emailAddress,
      firstName: offer.firstName,
      lastName: offer.lastName,
      // numberOfPeople: offer.numberOfPeople,
      // offerType: offer.offerType,
      phoneNumber: offer.phoneNumber,
      plan: offer.plan,
      dialCode: offer.dialCode,
      switching: offer.switching,
      referralCode
    };
    let json_response = {
      status: 'success',
      offer: safeOffer
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error: any) {
    console.log('api error ===>', error);
    if (error.code === 11000) {
      return createErrorResponse('Record already exists', 409);
    }

    return createErrorResponse(error.message, 500);
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
