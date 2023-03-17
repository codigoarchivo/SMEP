import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { SubscriptionModel } from '../../../models';
import { db } from '../../../database';
import { ISubscription } from '../../../interfaces';

type membershipSelectData =
    | { message: string }
    | ISubscription | null

export default function handle(req: NextApiRequest, res: NextApiResponse<membershipSelectData>) {

    switch (req.method) {
        case 'POST':
            return createSubcription(req, res);
        case 'PUT':
            return updateSubscription(req, res);
        default:
            return res.status(400).json({ message: 'Bad request' })
    }


}

const createSubcription = async (req: NextApiRequest, res: NextApiResponse<membershipSelectData>) => {

    const subscription: Session | null = await getSession({ req });

    if (!subscription) return res.status(401).json({ message: 'You must be authenticated to do this' });

    try {
        await db.connect();
        const newSubscription = new SubscriptionModel(req.body)
        await newSubscription.save()
        await db.disconnect();

        return res.status(201).json(newSubscription)
    } catch (error) {
        console.log(error);
        db.disconnect();
        return res.status(400).json({ message: 'Check the server console' })
    }
}

const updateSubscription = async (req: NextApiRequest, res: NextApiResponse<membershipSelectData>) => {
    const subscription: Session | null = await getSession({ req });
    if (!subscription) return res.status(401).json({ message: 'You must be authenticated to do this' });

    await db.connect();
    const listOneData = await SubscriptionModel.findOne({ _id: req.body.id }).lean();
    await db.disconnect();

    if (listOneData?.valid) return res.status(404).json({ message: 'It is already being processed' })

    try {
        await db.connect();
        const updateSubscriptionData = await SubscriptionModel.findOneAndUpdate({ _id: req.body.id }, { $set: { state: false } }).lean()
        await db.disconnect();

        res.status(200).json(updateSubscriptionData)

    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Check the server console' })
    }

}
