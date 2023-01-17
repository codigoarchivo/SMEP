import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import { db } from '../../../database';
import { User } from '../../../models';
import { jwt, validations } from '../../../utils';

type RegisterData =
    | { msg: string }
    | {
        token: string;
        user: {
            name: string,
            email: string,
            role: string
        }
    }

export default function handler(req: NextApiRequest, res: NextApiResponse<RegisterData>) {
    switch (req.method) {
        case 'POST':
            return registerUser(req, res);
        default:
            return res.status(400).json({ msg: 'Back request' })
    }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<RegisterData>) => {
    /* Destructuring the req.body object and assigning default values to the variables. */
    const { email = '', password = '', name = '' } = req.body;

    /* Checking if the email is valid. */
    if (!validations.isValidEmail(email)) return res.status(400).json({ msg: 'Email is not valid' });

    /* Connecting to the database, finding a user with the email provided and disconnecting from the database. */
    await db.connect();
    const user = await User.findOne({ email })
    await db.disconnect();

    /* Checking if the user exists in the database. */
    if (user) return res.status(400).json({ msg: 'The email is already registered' });

    /* Checking if the password is less than 6 characters. */
    if (password.length < 6) return res.status(400).json({ msg: 'Password must have more than 6 characters' });

    /* Checking if the name is less than 2 characters. */
    if (name.length < 2) return res.status(400).json({ msg: 'Name must have more than 2 characters' });

    /* Creating a new user object. */
    const data = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync(password),
        role: 'client',
        name
    })

    /* Trying to save the data to the database. If it fails, it will return a 500 error. */
    try {
        await data.save({ validateBeforeSave: true });
    } catch (error) {
        return res.status(500).json({ msg: 'Review server logs' })
    }

    /* Creating a token with the user id and email. */
    const token = jwt.singToken(data._id, data.email);

    /* Returning a json object with the token and user data. */
    return res.status(200).json({
        token,
        user: {
            email,
            role: 'client',
            name,
        }
    })
}
