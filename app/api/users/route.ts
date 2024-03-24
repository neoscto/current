import { createOrUpdateUserByEmail } from '@/lib/actions/user';
import { createUserOffer } from '@/lib/actions/user-offer';
import { createErrorResponse } from '@/lib/api-response';
import connectDB from '@/lib/connect-db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
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
      emailAddress: body.emailAddress,
      firstName: body.firstName,
      lastName: body.lastName,
      dialCode: body.dialCode,
      phoneNumber: body.phoneNumber,
      cups: body.cups,
      address: body.address,
      city: body.city,
      postcode: body.postcode,
      referralCode: referralCode,
      numberOfPeople: body.numberOfPeople
    };
    // Create User
    const { data, error } = await createOrUpdateUserByEmail(requestBody);
    if (error) {
      throw error;
    }
    // Create user offer
    if (data) {
      const userOffer = await createUserOffer({
        user: data._id,
        offerType: body.offerType
      });

      let json_response = {
        status: 'success',
        data: { ...data, offerId: userOffer._id }
      };
      return new NextResponse(JSON.stringify(json_response), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error: any) {
    console.log('api error ===>', error);
    if (error.code === 11000) {
      return createErrorResponse('Record already exists', 409);
    }

    return createErrorResponse(error.message, 500);
  }
}
