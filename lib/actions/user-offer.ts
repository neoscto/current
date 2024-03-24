'use server';

import { UserOffer, UserOfferSchemaProps } from '@/models/UsersOffers';

export const createUserOffer = async (offerData: UserOfferSchemaProps) => {
  try {
    const { user, offerType } = offerData;
    if (!user || !offerType)
      throw new Error("User and offertype can't be empty 😔");
    const userOffer = await UserOffer.create({ user, offerType });
    return userOffer;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating user offer 😔');
  }
};
