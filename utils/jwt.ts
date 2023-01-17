import jwt from 'jsonwebtoken';

export const singToken = (_id: string, email: string) => {
    /* Checking if the JWT_SECRET_SEED is set in the environment variables. If it is not set, it will throw an error. */
    if (!process.env.JWT_SECRET_SEED) throw new Error('No JWT seed');

    /* Creating a token with the user's id and email. */
    return jwt.sign(
        { _id, email },
        process.env.JWT_SECRET_SEED,
        { expiresIn: '30d' }
    )
};

export const isValidToken = (token: string): Promise<string> => {
    /* Checking if the JWT_SECRET_SEED is set in the environment variables. If it is not set, it will throw an error. */
    if (!process.env.JWT_SECRET_SEED) throw new Error('No JWT seed');

    /* Checking if the token is valid. If it is not, it will reject the promise. */
    if (token.length <= 10) return Promise.reject('JWT is invalid');

   /* Checking if the token is valid. If it is not, it will reject the promise. */
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if (err) return reject('JWT is invalid');

                const { _id } = payload as { _id: string };
                resolve(_id)
            })
        } catch (error) {
            reject('JWT is invalid');
        }
    })
}