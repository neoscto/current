// import { createErrorResponse } from "@/lib/api-response";
// import connectDB from "@/lib/connect-db";
// import { UsersOffers, UsersOffersSchemaType } from "@/models/UsersOffers";
// import { NextResponse } from "next/server";

// const createUserOffer = async ({
//   emailAddress,
//   offerType,
//   firstName,
//   lastName,
//   phoneNumber,
//   dialCode,
//   cups,
//   plan,
//   address,
//   city,
//   numberOfPeople,
//   postcode,
//   referralCode,
//   termsConditionRead,
//   event,
// }: UsersOffersSchemaType) => {
//   try {
//     await connectDB();
//     const data = await UsersOffers.create({
//       offerType,
//       emailAddress,
//       firstName,
//       lastName,
//       phoneNumber,
//       dialCode,
//       cups,
//       plan,
//       address,
//       city,
//       postcode,
//       referralCode,
//       numberOfPeople,
//       termsConditionRead,
//       event,
//     });

//     return {
//       data,
//     };
//   } catch (error) {
//     return { error };
//   }
// };

// export async function POST(request: Request) {
//   try {
//     await connectDB();

//     const body = await request.json();
//     if (!body.emailAddress) {
//       return createErrorResponse("Email is required", 400);
//     }
//     // generate 8 character random string for referral code
//     const codeString = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789'
//     let referralCode = '';
//     for (let i = 0; i < 8; i++) {
//       referralCode += codeString.charAt(Math.floor(Math.random() * codeString.length));
//     }
//     const requestBody: any = {
//       offerType: body.offerType,
//       emailAddress: body.emailAddress,
//       firstName: body.firstName,
//       lastName: body.lastName,
//       dialCode: body.dialCode,
//       phoneNumber: body.phoneNumber,
//       cups: body.cups,
//       plan: body.plan,
//       address: body.address,
//       city: body.city,
//       postcode: body.postcode,
//       referralCode: referralCode,
//       termsConditionRead: body.termsConditionRead,
//       numberOfPeople: body.numberOfPeople,
//     };
//     const { data, error } = await createUserOffer(requestBody);
//     if (error) {
//       throw error;
//     }

//     let json_response = {
//       status: "success",
//       data,
//     };
//     return new NextResponse(JSON.stringify(json_response), {
//       status: 201,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error: any) {
//     console.log("api error ===>", error);
//     if (error.code === 11000) {
//       return createErrorResponse("Record already exists", 409);
//     }

//     return createErrorResponse(error.message, 500);
//   }
// }
export async function GET(request: Request) {}
