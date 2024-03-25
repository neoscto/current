'use server';

import { UserOffer, UserOfferSchemaProps } from '@/models/UsersOffers';
import { stringToObjectId } from '@/lib/api-response';

export const createOrUpdateUserOffer = async (
  offerData: UserOfferSchemaProps,
  offerId?: string
) => {
  try {
    if (offerId) {
      const existingUserOffer = await UserOffer.findByIdAndUpdate(
        stringToObjectId(offerId),
        { $set: offerData },
        { new: true }
      )
        .lean()
        .exec();
      return JSON.parse(JSON.stringify(existingUserOffer));
    }

    if (!offerData.user) throw new Error("User can't be empty 😔");
    const userOffer = (await UserOffer.create(offerData)).toObject();
    return JSON.parse(JSON.stringify(userOffer));
  } catch (error) {
    console.error(error);
    throw new Error('Error creating user offer 😔');
  }
};

export const getUserOffer = async (offerId: string) => {
  try {
    const userOffer = await UserOffer.findById(stringToObjectId(offerId))
      .lean()
      .exec();
    if (!userOffer) throw new Error('User offer not found 😔');
    return JSON.parse(JSON.stringify(userOffer));
  } catch (error) {
    console.error(error);
    throw new Error('Error getting user offer 😔');
  }
};
