import Head from "next/head";
import {GetServerSideProps} from "next";
import {useContext} from "react";


import {IMovies, Products} from "@/interfaces/app.interface";
import {API_REQUEST} from "@/services/api.service";
import {Header, Hero, Row, Modal} from './components'
import {AuthContext} from "@/context/auth.context";
import {userInfoState} from "@/store";
import SubscriptionList from "@/pages/components/SubscriptionList";


export default function Home({trending, tv, products}: HomeProps) {
    const {modal} = userInfoState()
    const subscription = false

    const {isLoading, user} = useContext(AuthContext)

    if (!subscription) return <SubscriptionList products={products} />


    if (isLoading) return <p>Loading...</p>


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


export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
    const [trending, tv, products] = await Promise.all([
        fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=81602ea33120c8e6b0c0454800142742').then(res => res.json()),
        fetch('https://api.themoviedb.org/3/trending/tv/day?api_key=81602ea33120c8e6b0c0454800142742').then(res => res.json()),
        fetch(API_REQUEST.products).then(res => res.json())
    ])

    return {
        props: {
            trending: trending.results,
            tv: tv.results,
            products: products.data
        }
    }
}

interface HomeProps {
    trending: IMovies[],
    tv: IMovies[],
    products: Products[]
}

