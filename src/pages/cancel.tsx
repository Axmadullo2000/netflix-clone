import React from 'react';
import Image from "next/image";
import {useRouter} from "next/router";
import {TiCancel} from "react-icons/ti";


function Cancel() {
    const router = useRouter()

    return (
        <div className={'px-4 py-2 h-screen bg-black'}>
            <Image src={'/logo.png'} width={56} height={56} alt={'logo'} className={'cursor-pointer object-contain'} />
            <div className={'h-[70vh] flex flex-col justify-center items-center'}>
                <TiCancel size={90} color={'red'} />

                <h2 className={'text-red-500 text-4xl mt-4'}>Произошла ошибка при покупке товара</h2>
                <button onClick={() => router.push('/')} className={'text-red-500 border-red-500 border-2 px-3 py-3 text-xl font-bold rounded-lg mt-6'}>
                    Домой
                </button>
            </div>
        </div>
    )
}

export default Cancel;
