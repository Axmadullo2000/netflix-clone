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
            const base_url = process.env.NEXT_PUBLIC_DOMAIN as string

            const {email, priceId} = req.body
            const customers = await stripe.customers.list({limit: 100})
            const customer = customers.data.find(item => item.email === email)

            const subscription = await stripe.checkout.sessions.create({
                mode: 'subscription',
                payment_method_types: ['card'],
                line_items: [{
                    price: priceId,
                    quantity: 1
                }],
                customer: customer?.id,
                success_url: `${base_url}/success`,
                cancel_url: `${base_url}/cancel`
            })

            res.status(209).json({subscription})
        }catch (e) {
            const error = e as Error
            res.status(400).json({message: error.message})
        }
    }
    else {
        res.status(400).json({message: 'Method not allowed'})
    }
}


interface Data {
    message?: string,
    subscription?: Stripe.Response<Stripe.Checkout.Session>
}
