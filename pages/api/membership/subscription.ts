import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { Subscription } from '../../../models';
import { db } from '../../../database';
import { IMembership } from '../../../interfaces';

type membershipSelectData =
    | { message: string }
    | IMembership

export default function handle(req: NextApiRequest, res: NextApiResponse<membershipSelectData>) {

    switch (req.method) {
        case 'POST':
            return createSubcription(req, res)
        default:
            return res.status(400).json({ message: 'Bad request' })
    }


}

const createSubcription = async (req: NextApiRequest, res: NextApiResponse<membershipSelectData>) => {

    const session: Session | null = await getSession({ req });

    if (!session) return res.status(401).json({ message: 'You must be authenticated to do this' });

    try {
        await db.connect();

        const newSubcription = new Subscription({ ...req.body, valid: false })

        await newSubcription.save()

        await db.disconnect();

        return res.status(201).json(newSubcription)
    } catch (error) {
        console.log(error);
        db.disconnect();
        return res.status(400).json({ message: 'Bad request' })
    }
}