import { User } from '@/models/User';
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
    const user = await User.findById(stringToObjectId(id)).lean().exec();
    if (!user) {
      throw new Error('User not found');
    }
    let json_response = {
      status: 'success',
      data: user
    };
    return NextResponse.json(json_response);
  } catch (error: any) {
    if (typeof error === 'string' && error.includes('Data not found')) {
      return createErrorResponse('Data not found', 404);
    }

    return createErrorResponse(error.message, 500);
  }
}
