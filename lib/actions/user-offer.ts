'use server';
import { stringToObjectId } from '@/lib/api-response';
import { UserOffer, UserOfferSchemaProps } from '@/models/UsersOffers';

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
      return existingUserOffer;
    }
    const userOffer = await UserOffer.create(offerData);
    return userOffer;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating user offer 😔');
  }
};
