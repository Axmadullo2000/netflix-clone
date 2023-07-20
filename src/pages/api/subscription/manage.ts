import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';
import * as process from "process";


const api_key = process.env.NEXTSECRETAPIKEY as string

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
            const {token} = req.body

            const customers = await stripe.customers.list({ limit: 100 })
            const customer = customers.data.find(c => c.metadata.token === token) as Stripe.Customer


            const portal = await stripe.billingPortal.sessions.create({
                customer: customer.id,
                return_url: '/account'
            });

            return res.status(200).json({ portal: portal.url })
        }catch (e) {
            const error = e as Error
            return res.status(400).json({message: error.message})
        }

    }
}


interface Data {
    portal?: string,
    message?: string
}
