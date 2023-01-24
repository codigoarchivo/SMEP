import NextAuth from 'next-auth';
import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
import { db } from '../../../database';
import { User } from '../../../models';

export default NextAuth({
    providers: [
        /* Creating a custom login form. */
        Credentials({
            name: 'Custom Login',
            credentials: {
                email: { label: 'Email:', type: 'email', placeholder: 'correo@google.com' },
                password: { label: 'Password:', type: 'password', placeholder: 'Password' },
            },

            /* Checking if the user exists in the database. */
            // @ts-ignore
            async authorize(credentials) {
                return await checkUserEmailPassword(credentials!.email, credentials!.password);
            },
        }),
    ],

    /* Setting the routes for the login and register pages. */
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register'
    },

    /* Setting the session to expire in 30 days. */
    session: {
        maxAge: 2592000, /// 30d
        strategy: 'jwt',
        updateAge: 86400, /// 1d
    },

    callbacks: {
        /* Creating a JWT token with the user information. */
        async jwt({ token, user, account }) {
            if (account) {
                token.accessToken = account.access_token;

                switch (account.type) {
                    case 'oauth':
                        token.user = await oAUthToDbUser(user?.email || '', user?.name || '');
                        break;
                    case 'credentials':
                        token.user = user
                        break;
                }
            };

            return token
        },

        /* Setting the session object to be returned to the client. */
        async session({ session, user, token }: any) {
            session.accessToken = token.accessToken;
            session.user = token.user;
            return session
        },
    }
})

const checkUserEmailPassword = async (email: string, password: string) => {
    /* Connecting to the database, finding the user by email, and disconnecting from the database. */
    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    /* If the user is not found, it returns null. */
    if (!user) return null;

    /* Comparing the password that the user entered with the password that is stored in the database. */
    if (!bcrypt.compareSync(password, user.password!)) return null;

    /* Returning an object with the properties _id, email, role, and name. */
    return {
        _id: user._id,
        email: email.toLocaleLowerCase(),
        role: user.role,
        name: user.name,
    }
}

const oAUthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
    await db.connect();
    /* Looking for a user with the email that was passed in the function. */
    const user = await User.findOne({ email: oAuthEmail });

    /* If the user exists, it returns the user. */
    if (user) {
        await db.disconnect();
        const { _id, name, email, role } = user;
        return { _id, name, email, role };
    }

    /* Creating a new user with the email and name that was passed in the function. */
    const newUser = new User({ email: oAuthEmail, name: oAuthName, password: '@', role: 'client' });
    await newUser.save();

    await db.disconnect();

    const { _id, name, email, role } = newUser;

    /* Returning an object with the properties _id, name, email, and role. */
    return { _id, name, email, role };
}

