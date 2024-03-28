import { createOrUpdateOfferAnalytics } from '@/lib/actions/offer-analytics';
import { createErrorResponse, stringToObjectId } from '@/lib/api-response';
import connectDB from '@/lib/connect-db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const userOffer = stringToObjectId(body.userOffer);
    const data = await createOrUpdateOfferAnalytics({ userOffer, ...body });
    let json_response = {
      status: 'success',
      data
    };
    return NextResponse.json(json_response);
  } catch (error: any) {
    if (typeof error === 'string' && error.includes('Data not found')) {
      return createErrorResponse('Data not found', 404);
    }

    return createErrorResponse(error.message, 500);
  }
}
