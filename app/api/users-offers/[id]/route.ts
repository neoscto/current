import { createErrorResponse, stringToObjectId } from '@/lib/api-response';
// import connectDB from '@/lib/connect-db';
// import { UsersOffers } from '@/models/UsersOffers';
// import { NextResponse } from 'next/server';

// async function getUserOfferById(id: string) {
//   try {
//     await connectDB();

//     const parsedId = stringToObjectId(id);

//     if (!parsedId) {
//       return { error: 'Data not found' };
//     }

//     const data = await UsersOffers.findById(parsedId).lean().exec();
//     if (data) {
//       return {
//         data
//       };
//     } else {
//       return { error: 'Data not found' };
//     }
//   } catch (error) {
//     return { error };
//   }
// }

// async function updateUserOfferById(id: string, obj: any) {
//   try {
//     await connectDB();

//     const parsedId = stringToObjectId(id);

//     if (!parsedId) {
//       return { error: 'Offer not found' };
//     }

//     const data = await UsersOffers.findByIdAndUpdate(parsedId, obj, {
//       new: true
//     })
//       .lean()
//       .exec();
//     if (data) {
//       return {
//         data
//       };
//     } else {
//       return { error: 'Data not found' };
//     }
//   } catch (error) {
//     return { error };
//   }
// }

// export async function GET(
//   _request: Request,
//   { params }: { params: { id: string } })
// {
//   try {
// //     await connectDB();
// //     const id = params.id;
// //     const { data, error } = await getUserOfferById(id);
// //     if (error) {
// //       throw error;
// //     }
// //     let json_response = {
// //       status: 'success',
// //       data
// //     };
// //     return NextResponse.json(json_response);
//   } catch (error: any) {
//     if (typeof error === 'string' && error.includes('Data not found')) {
//       return createErrorResponse('Data not found', 404);
//     }

//     return createErrorResponse(error.message, 500);
//   }

// export async function PATCH(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectDB();
//     const id = params.id;
//     let body = await request.json();
//     const { data, error } = await updateUserOfferById(id, body);
//     if (error) {
//       throw error;
//     }
//     let json_response = {
//       status: 'success',
//       data
//     };
//     return NextResponse.json(json_response);
//   } catch (error: any) {
//     console.error(error);
//     if (typeof error === 'string' && error.includes('Data not found')) {
//       return createErrorResponse('Data not found', 404);
//     }

//     return createErrorResponse(error.message, 500);
//   }

export async function GET(request: Request) {}
