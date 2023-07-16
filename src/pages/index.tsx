import Head from "next/head";
import {GetServerSideProps} from "next";
import Cookies from "js-cookie";
import {useContext} from "react";


import {IMovies, Products} from "@/interfaces/app.interface";
import {Header, Hero, Row, Modal} from './components';
import {userInfoState} from "@/store";
import SubscriptionList from "@/pages/components/SubscriptionList";
import {AuthContext} from "@/context/auth.context";
import {useRouter} from "next/router";


export default function Home({trending, tv, products,subscription}: HomeProps) {
    const {modal} = userInfoState()
    const {user} = useContext(AuthContext)
    const router = useRouter()

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
        fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=81602ea33120c8e6b0c0454800142742').then(res => res.json()),
        fetch('https://api.themoviedb.org/3/trending/tv/day?api_key=81602ea33120c8e6b0c0454800142742').then(res => res.json()),
        fetch('http://localhost:3000/api/products').then(res => res.json()),
        fetch(`http://localhost:3000/api/subscription/${token}`).then(res => res.json())
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
    trending: IMovies[],
    tv: IMovies[],
    products: Products[],
    subscription: string[]
}

