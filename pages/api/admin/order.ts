import type { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { OrderModel } from '../../../models';

type membershipData =
  | { message: string }
  | IOrder

export default function handle(req: NextApiRequest, res: NextApiResponse<membershipData>) {

  switch (req.method) {
    case 'POST':
      return createMembership(req, res)
    default:
      return res.status(400).json({ message: 'Bad request' })
  }


}

const createMembership = async (req: NextApiRequest, res: NextApiResponse<membershipData>) => {

  const subscription: Session | null = await getSession({ req });
  if (!subscription) res.status(401).json({ message: 'You must be authenticated to do this' })

  try {
    await db.connect();
    const order = new OrderModel(req.body);
    await order.save();
    await db.disconnect();

    return res.status(201).json(order)

  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: 'Bad request' })
  }
}
