import type { NextApiRequest, NextApiResponse } from 'next'

type membershipData = {
  message: string
}

export default function handle(req: NextApiRequest, res: NextApiResponse<membershipData>) {

  switch (req.method) {
    case 'POST':
      return createMembership(req, res)
    default:
      return res.status(400).json({ message: 'Bad request' })
  }


}

const createMembership = (req: NextApiRequest, res: NextApiResponse<membershipData>) => {
   console.log(req.body);
   
  // res.status(400).json({ message: 'createMembership' })
}
