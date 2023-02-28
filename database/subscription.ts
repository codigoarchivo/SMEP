import { isValidObjectId } from "mongoose";
import { SubscriptionModel } from '../models';
import { db } from ".";

export const listSubscription = async (user: string) => {
    if (!isValidObjectId(user)) return [];

    await db.connect();
    const session = await SubscriptionModel.find({ user, state: true }).sort({ createAt: 'desc' }).lean()
    await db.disconnect();

    return JSON.parse(JSON.stringify(session))
}
