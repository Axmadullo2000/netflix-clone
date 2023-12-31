import Head from "next/head";
import {GetServerSideProps} from "next";
import Cookies from "js-cookie";
import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";


import {IMovies, Products} from "@/interfaces/app.interface";
import {userInfoState} from "@/store";
import {AuthContext} from "@/context/auth.context";
import getList from "@/helpers/list";
import {Header, Hero, Row, Modal} from '../components';
import {SubscriptionList} from "../components";
import {API_REQUEST} from "@/services/api.service";


export default function Home({trending, tv, products,subscription}: HomeProps) {
    const {modal} = userInfoState()
    const {user} = useContext(AuthContext)
    const router = useRouter()
    const [myList, setMyList] = useState<IMovies[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getList(user?.uid)
            const array = data.map(item => item.product) as IMovies[]
            setMyList(array)
        }

        fetchData()

        // eslint-disable-next-line
    }, [])


    if (!subscription.length) return <SubscriptionList products={products} />


    if (!Cookies.get("token") && !user?.uid) {
        router.push('/auth')
    }

    return (
      <div className={'relative'}>
        <Head>
            <title>Welcome to Netflix platform</title>
            <meta name={'description'} content={'Netflix, movies/serials, new movies'}/>
            <meta name={'viewport'} content={'width=device-width, initial-scale=1'} />
            <link rel={'icon'} href={'./logo.png'} />
        </Head>

        <div className={'wrapper-container gap-x-4'}>
            <Header />
            <main className={''}>
                <Hero trending={trending} />
                <section>
                    <Row movies={tv} title={'TV '} isBig={false}/> {/* tv shows */}
                    <Row movies={tv} title={'TV'} isBig={true}/> {/* tv shows */}
                    <Row movies={myList} title={'My List'} isBig={true} /> {/* tv shows */}
                </section>
            </main>

            {modal && <Modal />}
        </div>
      </div>
  )
}


export const getServerSideProps: GetServerSideProps<HomeProps> = async ({req}) => {
    const token = req.cookies.user_id


    const [trending, tv, products, subscription] = await Promise.all([
        fetch(API_REQUEST.trending).then(res => res.json()),
        fetch(API_REQUEST.tvTop).then(res => res.json()),
        fetch(API_REQUEST.products_list).then(res => res.json()),
        fetch(`${API_REQUEST.subscription}/${token}`).then(res => res.json())
    ])

    return {
        props: {
            trending: trending.results,
            tv: tv.results,
            products: products.products.data,
            subscription: subscription.subscription.data
        }
    }
}


interface HomeProps {
    trending: IMovies[];
    tv: IMovies[];
    products: Products[];
    subscription: string[];
}


