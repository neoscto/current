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
