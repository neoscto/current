'use server';
export const maxDuration = 20;
export const dynamic = 'force-dynamic';

import { User, UserSchemaProps } from '@/models/User';

export const createOrUpdateUserByEmail = async (userData: UserSchemaProps) => {
  try {
    let user: any;
    const { emailAddress } = userData;
    if (!emailAddress) {
      throw new Error('Email address is required');
    }
    user = await User.findOne({ emailAddress }).lean().exec();

    if (user) {
      const { referralCode, ...otherData } = userData;
      user = await User.findOneAndUpdate(
        { emailAddress },
        { $set: otherData },
        { new: true }
      )
        .lean()
        .exec();
    } else {
      user = (await User.create(userData)).toObject();
    }

    return { data: JSON.parse(JSON.stringify(user)) };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const getUser = async (userId: string) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const user = await User.findById(userId).lean().exec();
    if (!user) {
      throw new Error('User not found');
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get user');
  }
};
