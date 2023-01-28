import type { NextApiRequest, NextApiResponse } from 'next'

type membershipSelectData =
    | { message: string }
    | { _id: string }

export default function handle(req: NextApiRequest, res: NextApiResponse<membershipSelectData>) {

    switch (req.method) {
        case 'POST':
            return createMembershipSelect(req, res)
        default:
            return res.status(400).json({ message: 'Bad request' })
    }


}

const createMembershipSelect = (req: NextApiRequest, res: NextApiResponse<membershipSelectData>) => {
    /* Destructuring the token from the cookies. */
    // console.log(req.cookies);
    
    // const { token = '' } = req.cookies;
    return res.status(200).json({ _id: 'createMembership' })
}