export const maxDuration = 30;
export const dynamic = 'force-dynamic';

import { createErrorResponse } from '@/lib/api-response';
import connectDB from '@/lib/connect-db';
import { NextResponse } from 'next/server';

import { stringToObjectId } from '@/lib/api-response';
import { UserOffer, UserOfferSchemaProps } from '@/models/UsersOffers';

const createOrUpdateUserOffer = async (
  offerData: UserOfferSchemaProps,
  offerId?: string
) => {
  try {
    if (!offerData.user) throw new Error("User can't be empty 😔");
    if (offerId) {
      const existingUserOffer = await UserOffer.findByIdAndUpdate(
        stringToObjectId(offerId),
        { $set: offerData },
        { new: true }
      )
        .lean()
        .exec();
      return existingUserOffer;
    }
    const userOffer = await UserOffer.create(offerData);
    return userOffer;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating user offer 😔');
  }
};

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    // Create User Offer
    const offer = await createOrUpdateUserOffer(body.offerData, body.offerId);
    let json_response = {
      status: 'success',
      offer
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
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
