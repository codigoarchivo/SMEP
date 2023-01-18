import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { db } from '../../../database';
import { User } from '../../../models';
import { jwt, validations } from '../../../utils';

type loginData =
    | { msg: string }
    | {
        token: string,
        user: {
            name: string,
            email: string,
            role: string
        }
    }

export default function handler(req: NextApiRequest, res: NextApiResponse<loginData>) {
    switch (req.method) {
        case 'POST':
            return loginUser(req, res)
        default:
            return res.status(400).json({ msg: 'Back request' })
    }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<loginData>) => {
    /* Destructuring the request body. */
    const { email = '', password = '' } = req.body;

    /* Checking if the email is valid. */
    if (!validations.isValidEmail(email)) return res.status(400).json({ msg: 'Email is not valid' });

    /* Connecting to the database, finding a user with the email provided and disconnecting from the database. */
    await db.connect();
    const user = await User.findOne({ email })
    await db.disconnect();

    /* If the user is not found, it returns a 400 status code with a message. */
    if (!user) return res.status(400).json({ msg: 'Invalid email or password - EMAIL' });

    /* Checking if the password is correct. */
    if (!bcrypt.compareSync(password, user.password!)) return res.status(400).json({ msg: 'Invalid email or password - PASSWORD' });

    /* Destructuring the user object. */
    const { role, name, _id } = user!;

    /* Creating a token with the user id and email. */
    const token = jwt.singToken(_id, email);

    /* Returning a json object with the token and user data. */
    return res.status(200).json({
        token,
        user: {
            email,
            role,
            name,
        }
    })
}
