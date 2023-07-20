import React from 'react';
import Link from "next/link";
import Image from "next/image";


import {PlanCard} from "../";
import useAuth from "@/hooks/useAuth";
import {Products} from "@/interfaces/app.interface";


export interface SubscriptionListProps {
    products: Products[]
}


function SubscriptionList ({products}: SubscriptionListProps) {
    const {logout} = useAuth()


    return (
        <div className={'bg-blue-500'}>
            <div className={'flex justify-between bg-white px-4 py-3 shadow-red-200 border-b-red-200 border-b-2'}>
                <Link href={'/'}>
                    <Image src={'/logo.png'} alt={'logo'} width={56} height={56} />
                </Link>
                <button onClick={logout} className={'px-2 py-2 hover:text-red-300'}>Logout</button>
            </div>


            <div className={'flex justify-center items-center flex-col space-y-6 mt-5 pb-5'}>
                <h2 className={'md:text-5xl text-2xl font-bold'}>Flexible pricing for teams of any size.</h2>
                <p className={'md:text-2xl text-xl mx-auto'}>Relaxing with watching your favourite movies and tv.</p>

                <div className={'flex gap-x-6 flex-col md:flex-row gap-y-6'}>
                    {products.map(product => (
                        <PlanCard key={product.id} product={product} />
                    )).reverse()}
                </div>
            </div>

        </div>
    )
}

export default SubscriptionList

