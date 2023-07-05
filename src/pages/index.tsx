import Head from "next/head";
import {GetServerSideProps} from "next";

import {IMovies} from "@/interfaces/app.interface";
import {API_REQUEST} from "@/services/api.service";

import {Header, Hero, Row} from './components'
import {useContext} from "react";
import {AuthContext} from "@/context/auth.context";


export default function Home({trending, tv, tvTop, popular}: HomeProps) {
    const {isLoading} = useContext(AuthContext)

    if (isLoading) return null


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
                    <Row movies={tv} title={'ТВ Передачи'} isBig={false}/> {/* tv shows */}
                    <Row movies={tvTop} title={'Популярные передачи'} isBig={true} /> {/* tv shows */}
                    <Row movies={popular} title={'Популярные фильмы'} isBig={true} /> {/* tv shows */}
                    <Row movies={tv} title={'ТВ Передачи'} isBig={true}/> {/* tv shows */}
                </section>
            </main>
        </div>
      </div>
  )
}


export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
    const [trending, tv, popular, tvTop] = await Promise.all([
        fetch(API_REQUEST.trending).then(res => res.json()),
        fetch(API_REQUEST.tv).then(res => res.json()),
        fetch(API_REQUEST.popular).then(res => res.json()),
        fetch(API_REQUEST.tvTop).then(res => res.json()),
    ])

    return {
        props: {
            trending: trending.results,
            tv: tv.results,
            popular: popular.results,
            tvTop: tvTop.results,
        }
    }
}

interface HomeProps {
    trending: IMovies[],
    tv: IMovies[],
    popular: IMovies[],
    tvTop: IMovies[]
}
