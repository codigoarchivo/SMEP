import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { User } from '../../../models';
import { jwt } from '../../../utils';

type IsValidToken =
    | { msg: string; }
    | {
        token: string;
        user: {
            email: string;
            role: string;
            name: string;
        }
    }

export default function hadler(req: NextApiRequest, res: NextApiResponse<IsValidToken>) {
    switch (req.method) {
        case 'GET':
            return checkJWT(req, res);
        default:
            return res.status(400).json({ msg: 'Back request' })
    }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<IsValidToken>) => {
    /* Destructuring the token from the cookies. */
    const { token = '' } = req.cookies;

    let userId = '';

    /* Checking if the token is valid. */
    try {
        userId = await jwt.isValidToken(token.toString())
    } catch (error) {
        return res.status(401).json({ msg: 'Authorization token is not valid' })
    }

    /* Connecting to the database, finding the user by the id and disconnecting from the database. */
    await db.connect();
    const user = await User.findById(userId).lean();
    await db.disconnect();

    /* Checking if the user exists. */
    if (!user) return res.status(400).json({ msg: 'There is no user with that id' });

    /* Destructuring the user object. */
    const { _id, email, role, name } = user;

    /* Creating a new token. */
    const tokenNew = jwt.singToken(_id, email);

    /* Returning the token and the user object. */
    return res.status(200).json({
        token: tokenNew,
        user: {
            email,
            role,
            name,
        }
    })
}
