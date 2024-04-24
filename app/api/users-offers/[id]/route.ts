import { UserOffer } from '@/models/UsersOffers';
import { stringToObjectId } from '@/lib/api-response';
import { createErrorResponse } from '@/lib/api-response';
import connectDB from '@/lib/connect-db';
import { NextResponse } from 'next/server';
import { createOrUpdateUserOffer } from '@/lib/actions/user-offer';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const id = params.id;
    const offer = await UserOffer.findById(stringToObjectId(id)).lean().exec();
    if (!offer) throw new Error('User offer not found 😔');
    let json_response = {
      status: 'success',
      offer
    };
    return NextResponse.json(json_response);
  } catch (error: any) {
    if (typeof error === 'string' && error.includes('Data not found')) {
      return createErrorResponse('Data not found', 404);
    }

    return createErrorResponse(error.message, 500);
  }
}

export async function PUT(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const id = params.id;
    if (!id) throw new Error('User offer id is required');
    const body = await _request.json();
    const offer = await createOrUpdateUserOffer(body);
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
      referralCode: offer.referralCode,
      address: offer.address,
      postcode: offer.postcode,
      city: offer.city,
      nie: offer.nie,
      addressNo: offer.addressNo,
      province: offer.province,
      typeConsumption: offer.typeConsumption,
      iban: offer.iban,
      bic: offer.bic,
      switching: offer.switching
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
  } catch (error) {}
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
