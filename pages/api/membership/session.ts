import type { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { ISession } from '../../../interfaces';
import { SessionModel } from '../../../models';

type membershipSelectData =
    | { message: string }
    | ISession | null


export default function handle(req: NextApiRequest, res: NextApiResponse<membershipSelectData>) {

    switch (req.method) {
        case 'POST':
            return createSession(req, res);
        case 'PUT':
            return updateSession(req, res);
        default:
            return res.status(400).json({ message: 'Bad request' })
    }


}
const createSession = async (req: NextApiRequest, res: NextApiResponse<membershipSelectData>) => {
    const session: Session | null = await getSession({ req });
    if (!session) return res.status(401).json({ message: 'You must be authenticated to do this' });

    try {
        await db.connect();
        const newSession = new SessionModel(req.body)
        await newSession.save();
        await db.disconnect();

        return res.status(201).json(newSession)
    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Check the server console' })
    }
}

const updateSession = async (req: NextApiRequest, res: NextApiResponse<membershipSelectData>) => {
    const session: Session | null = await getSession({ req });
    if (!session) return res.status(401).json({ message: 'You must be authenticated to do this' });

    await db.connect();
    const listOneData = await SessionModel.findOne({ _id: req.body.id }).lean();
    await db.disconnect();

    if (listOneData?.valid) return res.status(404).json({ message: 'It is already being processed' })

    try {
        await db.connect();
        const updateSessionData = await SessionModel.findOneAndUpdate({ _id: req.body.id }, { $set: { state: false } }).lean()
        await db.disconnect();

        res.status(200).json(updateSessionData)

    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Check the server console' })
    }

}
