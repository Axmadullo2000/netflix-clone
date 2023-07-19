import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';
import * as process from "process";


const api_key = "sk_test_51NSetQBKDAx00Tu4mvUw10OauUj3SvTCJG32YtuW1ecSavlF76rSCWe4uKKEwuPFbi7HzLsrCOLfXeVD8IvP74E600CrsDnTxl" as string

const stripe = new Stripe(api_key, {
    apiVersion: '2022-11-15',
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {method} = req

    if (method === 'POST') {
        try {
            const {email, token} = req.body

            await stripe.customers.create({
                email,
                metadata: {token}
            })

            res.status(200).json({message: "Success"})
        }catch (e) {
            const error = e as Error
            res.status(400).json({message: error.message})
        }
    }

    else {
        res.status(400).json({message: 'Method not allowed'})
    }
}


type Data = {
    message?: string
}
