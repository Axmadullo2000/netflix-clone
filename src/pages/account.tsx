import React, {useState} from 'react';
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {CiUser} from "react-icons/ci";
import {AiOutlineYoutube} from "react-icons/ai";
import moment from "moment";
import {GetServerSideProps} from "next";


import {ISubscription} from "@/interfaces/app.interface";


function Account({subscription}: AccountProps) {
    const [isLoading, setIsLoading] = useState(false)


    const openPortal = async () => {
        setIsLoading(true)
        const response = await fetch('/api/subscription/manage/', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({token: subscription.customer.metadata.token})
        })

        const data = await response.json()

        window.open(data.portal)
        setIsLoading(false)
    }


    return (
        <div className={'h-full md:h-screen bg-red-500'}>
            <Head>
                <title>Account Settings</title>
            </Head>
            <div>
                <div className={'flex items-center justify-between px-5 py-4'}>
                    <Link href={'/'}><Image src={'/logo.png'} alt={'logo'} width={56} height={56} /></Link>
                    <CiUser className={'h-8 w-8 cursor-pointer'} color={'white'} />
                </div>

                <div>
                    <div className={'flex items-center justify-center gap-2'}>
                        <h1 className={'text-slate-100'}>Account</h1>
                        <AiOutlineYoutube className={'h-8 w-8 cursor-pointer'} color={'white'} />
                        <p className={'text-slate-100'}>Member since {moment(subscription?.current_period_start * 1000).format('DD MMM yyyy')}</p>
                    </div>

                    <div className={'flex md:w-[800px] w-full justify-center border-2 mt-3 mx-auto border-slate-200 gap-4 px-3 py-3'}>
                        <div className={'border-slate-200 border-r-2 pr-2'}>
                            <p className={'text-slate-100'}>Member & Billing</p>
                            <button onClick={openPortal} className={'acc_btn mt-4'}>{isLoading ? "Loading..." : "Cancel Membership" }</button>
                        </div>
                        <div>
                            <div className={'flex flex-col md:flex-row justify-between gap-4 border-b-2 border-slate-200 pb-4'}>
                                <div>
                                    <p className={'text-slate-100'}>{subscription.customer.email}</p>
                                    <p className={'text-slate-100'}>Password: ******</p>
                                </div>

                                <div className={'flex flex-col'}>
                                    <button className={'acc_btn'}>Change email</button>
                                    <button className={'acc_btn'}>Change password</button>
                                </div>
                            </div>
                            <div className={'flex items-baseline mt-4 gap-5'}>
                                <div>
                                    <p className={'mt-2'}>
                                        <span className={'px-4 py-2 font-mono text-xl uppercase text-slate-100 bg-black/20'}>{subscription.default_payment_method.card.brand}</span>
                                        <span className={'text-slate-100 ml-2'}>**** **** **** {subscription.default_payment_method.card.last4}</span>
                                    </p>
                                    <p className={'text-slate-100 mt-3'}>Your membership plan will end {moment(subscription.current_period_end * 1000).format("DD MMM yyy")} </p>
                                </div>
                                <div className={'flex flex-col'}>
                                    <button onClick={openPortal} className={'acc_btn'}>{isLoading ? "Loading..." : "Manage payment info"}</button>
                                    <button onClick={openPortal} className={'acc_btn'}>{isLoading ? "Loading" : 'Add backup payment method'}</button>
                                    <button onClick={openPortal} className={'acc_btn'}>{isLoading ? "Loading" : "Billing detail"}</button>
                                    <button onClick={openPortal} className={'acc_btn'}>{isLoading ? "Loading" : "Change billing day"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'flex flex-col md:flex-row md:w-[800px] w-full justify-between border-2 mt-3 mx-auto border-slate-200 gap-4 px-3 py-3'}>
                        <p className={'text-slate-100'}>Plan Detail</p>
                        <p className={'text-slate-100 font-bold text-xl'}>{subscription.plan.nickname}</p>
                        <button onClick={openPortal} className={'acc_btn'}>{isLoading ? "Loading" : 'Change Plan'}</button>
                    </div>
                    <div className={'flex w-full md:w-[800px] justify-between border-2 mt-3 mx-auto border-slate-200 gap-4 px-3 py-3'}>
                        <p className={'text-slate-100'}>Settings</p>
                        <button className={'acc_btn'}>Sign out of all devices</button>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;


export const getServerSideProps: GetServerSideProps<AccountProps> = async ({req}) => {
    const token = req.cookies.user_id

    const data = await fetch(`${API_REQUEST.subscription}/${token}`).then(res => res.json())

    if (!data.subscription.data.length) {
        return {
            redirect: {destination: '/', permanent: false}
        }
    }

    return {
        props: {
            subscription: data.subscription.data[0]
        }
    }
}


interface AccountProps {
    subscription: ISubscription
}
