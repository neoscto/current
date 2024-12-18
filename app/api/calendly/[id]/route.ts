import { createErrorResponse, stringToObjectId } from '@/lib/api-response';
import connectDB from '@/lib/connect-db';
import { UserOffer } from '@/models/UsersOffers';
import axios from 'axios';
import { NextResponse } from 'next/server';

async function updateUserOfferById(id: string, obj: any) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: 'Offer not found' };
    }

    const data = await UserOffer.findByIdAndUpdate(parsedId, obj, {
      new: true
    })
      .lean()
      .exec();

    if (data) {
      return {
        data
      };
    } else {
      return { error: 'Data not found' };
    }
  } catch (error) {
    return { error };
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const id = params.id;
    let body = await request.json();
    const userId = body.userId;
    var options = {
      method: 'GET',
      url: `https://api.calendly.com/scheduled_events/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CALENDLY_TOKEN}`
      }
    };
    let eventData;
    try {
      const response: any = await axios.request(options);
      eventData = response.data;
    } catch (error) {
      console.log('error', error);
      eventData = id;
    }

    const { data, error } = await updateUserOfferById(userId, {
      event: eventData
    });
    if (error) {
      throw error;
    }
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
