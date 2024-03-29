export const maxDuration = 30;
export const dynamic = 'force-dynamic';

import { createErrorResponse } from '@/lib/api-response';
import connectDB from '@/lib/connect-db';
import { NextResponse } from 'next/server';

import { stringToObjectId } from '@/lib/api-response';
import { UserOffer, UserOfferSchemaProps } from '@/models/UsersOffers';

export const createOrUpdateUserOffer = async (
  offerData: UserOfferSchemaProps,
  offerId?: string
) => {
  try {
    if (offerId) {
      const existingUserOffer = await UserOffer.findByIdAndUpdate(
        stringToObjectId(offerId),
        { $set: offerData },
        { new: true }
      )
        .lean()
        .exec();
      return JSON.parse(JSON.stringify(existingUserOffer));
    }

    if (!offerData.user) throw new Error("User can't be empty 😔");
    const userOffer = (await UserOffer.create(offerData)).toObject();
    return JSON.parse(JSON.stringify(userOffer));
  } catch (error) {
    console.error(error);
    throw new Error('Error creating user offer 😔');
  }
};

export async function PUT(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    // Create User Offer
    const data = await createOrUpdateUserOffer(body.offerData, body.offerId);
    let json_response = {
      status: 'success',
      data
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 200,
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
