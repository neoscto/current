import { UserOffer } from '@/models/UsersOffers';
import { stringToObjectId } from '@/lib/api-response';
import { createErrorResponse } from '@/lib/api-response';
import connectDB from '@/lib/connect-db';
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const id = params.id;
    const userOffer = await UserOffer.findById(stringToObjectId(id))
      .lean()
      .exec();
    if (!userOffer) throw new Error('User offer not found 😔');
    let json_response = {
      status: 'success',
      userOffer
    };
    return NextResponse.json(json_response);
  } catch (error: any) {
    if (typeof error === 'string' && error.includes('Data not found')) {
      return createErrorResponse('Data not found', 404);
    }

    return createErrorResponse(error.message, 500);
  }
}
