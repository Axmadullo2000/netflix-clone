import React, {useContext} from 'react';
import Image from "next/image";
import {BsSearch} from "react-icons/bs";
import {BiBell} from "react-icons/bi";
import {CiUser} from "react-icons/ci";
import Link from "next/link";
import {IoExitOutline} from "react-icons/io5";
import {AuthContext} from "@/context/auth.context";


function Header() {
    const {logout} = useContext(AuthContext)

    return (
        <header className={'flex justify-between p-4'}>
            <div className={'flex items-center gap-4'}>
                <Image src={'/logo.png'} alt={'logo'} width={56} height={56} />
                <ul className={'flex flex-col md:flex-row gap-6'}>
                    <li className={'cursor-pointer nav_link shadow_text'}>Домой</li>
                    <li className={'cursor-pointer nav_link shadow_text'}>Фильмы</li>
                    <li className={'cursor-pointer nav_link shadow_text'}>ТВ Шоу</li>
                    <li className={'cursor-pointer nav_link shadow_text'}>Новые фильмы</li>
                    <li className={'cursor-pointer nav_link shadow_text'}>Популярные фильмы</li>
                </ul>
            </div>

            <ul className={'flex flex-col md:flex-row items-center gap-3'}>
                <li>
                    <BsSearch className={'h-7 w-7 cursor-pointer'} color={'white'} />
                </li>
                <li className={'text-xl text-slate-100'}>
                    Kids
                </li>
                <li>
                    <BiBell className={'h-8 w-8 cursor-pointer'} color={'white'} />
                </li>
                <li>
                    <Link href={'account'}>
                        <CiUser className={'h-8 w-8 cursor-pointer'} color={'white'} />
                    </Link>
                </li>
                <li>
                    <button onClick={logout}>
                        <IoExitOutline className={'h-8 w-8 cursor-pointer'} color={'white'} />
                    </button>
                </li>
            </ul>
        </header>
    );
}

export default Header
