import Head from "next/head";
import {GetServerSideProps} from "next";
import {useContext} from "react";


import {IMovies} from "@/interfaces/app.interface";
import {API_REQUEST} from "@/services/api.service";
import {Header, Hero, Row, Modal} from './components'
import {AuthContext} from "@/context/auth.context";
import {userInfoState} from "@/store";


export default function Home({trending, tv}: HomeProps) {
    const {modal} = userInfoState()

    const {isLoading, user} = useContext(AuthContext)


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
    const [trending, tv] = await Promise.all([
        fetch(API_REQUEST.trending).then(res => res.json()),
        fetch(API_REQUEST.tv).then(res => res.json()),
    ])

    return {
        props: {
            trending: trending.results,
            tv: tv.results
        }
    }
}

interface HomeProps {
    trending: IMovies[],
    tv: IMovies[]
}
