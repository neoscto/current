'use server';

import { User, UserSchemaProps } from '@/models/User';

export const createOrUpdateUserByEmail = async (userData: UserSchemaProps) => {
  try {
    const { emailAddress } = userData;
    if (!emailAddress) {
      throw new Error('Email address is required');
    }
    const existingUser = await User.findOne({ emailAddress }).lean().exec();

    if (existingUser) {
      const { referralCode, ...otherData } = userData;
      const data = await User.findOneAndUpdate(
        { emailAddress },
        { $set: otherData },
        { new: true }
      )
        .lean()
        .exec();
      return { data };
    } else {
      const data = (await User.create(userData)).toObject();
      return { data };
    }
  } catch (error) {
    console.error(error);
    return { error };
  }
};
