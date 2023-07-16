import React from 'react';
import Image from "next/image";
import {useRouter} from "next/router";
import {BsCheck2} from "react-icons/bs";

function Success() {
    const router = useRouter()

    return (
        <div className={'px-4 py-2 bg-black h-screen'}>
            <Image src={'/logo.png'} width={56} height={56} alt={'logo'} className={'cursor-pointer object-contain'} />
            <div className={'h-[70vh] flex flex-col justify-center items-center'}>
                <BsCheck2 color={'green'} className={'border-green-500 rounded-lg border-2 h-10 w-10'} />
                <h2 className={'text-slate-100 text-4xl mt-4'}>Подписка выполнена</h2>
                <button onClick={() => router.push('/')} className={'text-green-400 border-green-500 border-2 px-3 py-3 rounded-lg mt-6'}>
                    Домой
                </button>
            </div>
        </div>
    )
}

export default Success;