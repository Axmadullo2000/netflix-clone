import React, {useState} from 'react';
import Head from "next/head";
import Image from "next/image";
import { Form, Formik } from "formik";
import * as Yup from 'yup'


import TextField from "src/pages/components/TextField";


function Auth() {
    const [auth, setAuth] = useState<'signup' | 'signin'>('signin')

    const toggleAuth = (state: 'signup' | 'signin') => {
        if (state === 'signin') {
            setAuth('signup')
        }else {
            setAuth('signin')
        }
    }

    const AuthSchema = Yup.object().shape({
        email: Yup.string()
            .min(4, 'Слишком короткая длина почты!')
            .max(50, 'Слишком длинный формат почты!')
            .required('Обязательна к заполнению'),
        password: Yup.string()
            .min(4, 'Слишком короткая длина пароля!')
            .max(50, 'Слишком длинный формат пароля!')
            .required('Обязательна к заполнению'),
    })


    return (
        <div className={'relative flex h-screen w-screen flex-col md:items-center md:justify-center bg-black md:bg-transparent'}>
            <Head>
                <title>Auth</title>
                <meta name={'description'} content={'For watching movies you should sign to app'}/>
                <meta name={'viewport'} content={'width=device-width, initial-scale=1'} />
                <link rel={'icon'} href={'./logo.png'} />
            </Head>

            <Image src={'https://rb.gy/p2hphi'} alt={'background'} fill className={'object-cover -z-10 !hidden sm:!inline opacity-100'}/>

            <Image
                src={'/logo.png'}
                alt={'logo'}
                width={70}
                height={70}
                className={'absolute left-4 top-4 cursor-pointer object-contain z-50'}
            />

            <div className={'relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'} onSubmit={(e) => e.preventDefault() }>
                <h1 className={'text-4xl font-semibold text-slate-100'}>{auth === 'signin' ? 'Вход в аккаунт' : 'Регистрация'}</h1>

                <Formik initialValues={{email: '', password: ''}} validationSchema={AuthSchema} onSubmit={(data) => {
                    console.log(data)}}>
                    <Form className={'space-y-3'}>
                        <TextField name={'email'} type={'email'} placeholder={'Почта'} />
                        <TextField name={'password'} type={'password'} placeholder={'Пароль'} />
                        <button type={'submit'} className={'w-full bg-[#e10856] mt-4 rounded py-3 font-semibold text-slate-100'}>{auth === 'signin' ? 'Войти' : 'Регистрироваться'}</button>
                    </Form>
                </Formik>


                <div className={'text-[gray]'}>
                    {auth === 'signin' ? (
                        <>
                            Нету аккаунта у вас?
                            <button className={'text-white hover:underline'} onClick={() => toggleAuth('signin')}>Зарегистрироваться сейчас</button>
                        </>
                    ) : (
                        <>
                            <span className={'ml-2'}>Уже есть аккаунта?</span>
                            <button className={'ml-2 block text-white hover:underline'} onClick={() => toggleAuth('signup')}>Войти в аккаунт сейчас</button>
                        </>
                    ) }
                </div>
            </div>
        </div>
    )
}

export default Auth

