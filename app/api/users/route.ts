export const maxDuration = 30;
export const dynamic = 'force-dynamic';

import { User, UserSchemaProps } from '@/models/User';
import { createErrorResponse } from '@/lib/api-response';
import connectDB from '@/lib/connect-db';
import { NextResponse } from 'next/server';

export const createOrUpdateUserByEmail = async (userData: UserSchemaProps) => {
  try {
    let user: any;
    const { emailAddress } = userData;
    if (!emailAddress) {
      throw new Error('Email address is required');
    }
    user = await User.findOne({ emailAddress }).lean().exec();

    if (user) {
      const { referralCode, ...otherData } = userData;
      user = await User.findOneAndUpdate(
        { emailAddress },
        { $set: otherData },
        { new: true }
      )
        .lean()
        .exec();
    } else {
      user = (await User.create(userData)).toObject();
    }

    return { data: JSON.parse(JSON.stringify(user)) };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

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
      addressNo: body.addressNo,
      city: body.city,
      country: body.country,
      postcode: body.postcode,
      referralCode: referralCode,
      numberOfPeople: body.numberOfPeople
    };
    // Create User
    const { data, error } = await createOrUpdateUserByEmail(requestBody);
    if (error) {
      throw error;
    }
    let json_response = {
      status: 'success',
      data
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.log('api error ===>', error);
    if (error.code === 11000) {
      return createErrorResponse('Record already exists', 409);
    }

    return createErrorResponse(error.message, 500);
  }
}
