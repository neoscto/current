'use server';

import { OfferAnalytics, OfferAnalyticsProps } from '@/models/OfferAnalytics';

export const createOrUpdateOfferAnalytics = async (
  offerAnalyticsData: OfferAnalyticsProps
) => {
  try {
    const { userOffer } = offerAnalyticsData;
    if (!userOffer) {
      throw new Error('No user offer provided 😔');
    }
    const existingOfferAnalytics = await OfferAnalytics.findOne({ userOffer });
    if (existingOfferAnalytics) {
      const offerAnalytics = await OfferAnalytics.findOneAndUpdate(
        { userOffer },
        { $set: offerAnalyticsData },
        { new: true }
      )
        .lean()
        .exec();
      return JSON.parse(JSON.stringify(offerAnalytics));
    }
    const newOfferAnalytics = (
      await OfferAnalytics.create(offerAnalyticsData)
    ).toObject();
    return JSON.parse(JSON.stringify(newOfferAnalytics));
  } catch (error) {
    console.error(error);
    throw new Error('Error creating offer analytics 😔');
  }
};
