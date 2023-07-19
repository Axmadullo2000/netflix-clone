import React, {useContext, useState} from 'react';
import Image from "next/image";
import {RiVipCrown2Line} from "react-icons/ri";
import {CgSandClock} from "react-icons/cg";
import {PiVideoBold} from "react-icons/pi";

import {AuthContext} from "@/context/auth.context";
import {Products} from "@/interfaces/app.interface";


export interface PlanCardProps {
    product: Products
}


function PlanCard({product}: PlanCardProps) {
    const [buy, setBuy] = useState<boolean>(true)
    const {user} = useContext(AuthContext)


    const onSubmitSubscription = async (priceId: string) => {
        const payload = {email: user?.email, priceId}
        const response = await fetch('/api/subscription', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        })

        const data = await response.json()

        window.open(data.subscription.url)

        console.log(data)
    }


    const onSubmit = () => {
        onSubmitSubscription(product?.default_price.id)
        setTimeout(() => {
            setBuy(true)
        }, 1500)
        setBuy(false)
    }


    return (
        <div onClick={onSubmit} className={'cursor-pointer md:w-[450px] md:h-[600px] w-[300px] bg-pink-300 pb-4 hover:scale-105 transition'}>
            <h3 className={'ml-6 py-4 text-red-600 font-bold text-2xl'}>{product.name}</h3>

            <div className={'relative'}>
                <Image src={product?.images[0]}
                       alt={'image1'} width={400} height={400} className={'mx-auto'} />

                <p className={'absolute top-0 left-6 bg-red-600 px-2 py-3 text-slate-100 text-2xl'}>{(product.default_price.unit_amount/100).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
            </div>

            <button onClick={onSubmit} className={'md:w-[400px] w-[300px] mx-auto block bg-pink-600 mt-5 uppercase text-slate-100 py-3 hover:opacity-60'}>{buy ? 'Buy Plan' : 'Waiting'}</button>

            <div className={'flex flex-col'}>
                {product.metadata.metadata.split(", ").map((item, index) => (
                    <div key={item} className={'ml-6 mt-4 gap-x-3 flex items-center'}>
                        {index === 0 && <RiVipCrown2Line className={'w-7 h-7'} color={'white'} />}
                        {index === 1 && <CgSandClock className={'w-7 h-7'} color={'white'} />}
                        {index === 2 && <PiVideoBold className={'w-7 h-7'} color={'white'} />}
                        <p className={'text-slate-100 text-xl'}>{item}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlanCard

