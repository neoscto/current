import { createErrorResponse } from "@/lib/api-response";
import connectDB from "@/lib/connect-db";
import { UsersOffers, UsersOffersSchemaType } from "@/models/UsersOffers";
import { NextResponse } from "next/server";

const createUserOffer = async ({
  emailAddress,
  offerType,
  firstName,
  lastName,
  phoneNumber,
  cups,
  address,
  city,
  postcode,
  termsConditionRead,
}: UsersOffersSchemaType) => {
  try {
    await connectDB();
    
    const data = await UsersOffers.create({
      offerType,
      emailAddress,
      firstName,
      lastName,
      phoneNumber,
      cups,
      address,
      city,
      postcode,
      termsConditionRead,
    });

    return {
      data,
    };
  } catch (error) {
    return { error };
  }
};

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    if (!body.emailAddress) {
      return createErrorResponse("Email is required", 400);
    }

    const { data, error } = await createUserOffer(body);
    if (error) {
      throw error;
    }

    let json_response = {
      status: "success",
      data,
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.log("api error ===>",error)
    if (error.code === 11000) {
      return createErrorResponse("Record already exists", 409);
    }

    return createErrorResponse(error.message, 500);
  }
}
