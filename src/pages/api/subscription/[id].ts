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
    const {token} = req.body
    const customers = await stripe.customers.list({limit: 100})
    const customer = customers.data.find(item => item.metadata.user_id === token)

    const subscription = await stripe.subscriptions.list({
        limit: 1,
        customer: customer?.id,
        expand: ['data.default_payment_method', 'data.customer']
    })

    return res.status(209).json({subscription})
}


type Data = {
    message?: string,
    subscription?: Stripe.Response<Stripe.ApiList<Stripe.Subscription>>
}
