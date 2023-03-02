import { isValidObjectId } from 'mongoose';
import { SessionModel } from '../models';
import { db } from '.';

export const listSession = async (user: string) => {
    if (!isValidObjectId(user)) return [];

    await db.connect();
    const session = await SessionModel.find({ user, state: true }).sort({ createAt: 'desc' }).lean()
    await db.disconnect();

    return JSON.parse(JSON.stringify(session))
}
