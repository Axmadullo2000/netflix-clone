import React, {useEffect, useState} from 'react';
import ReactStars from 'react-stars'
import Image from "next/image";

import {IMovies} from "@/interfaces/app.interface";
import {HeroProps} from "@/pages/components/Hero/hero.props";
import {image_base} from "@/helpers/constants";
import {userInfoState} from "@/store";
import {BsFillPlayFill} from "react-icons/bs";


function Hero({trending}: HeroProps) {
    const [movie, setMovie] = useState<IMovies>({} as IMovies)

    const {setModal, setCurrentMovie} = userInfoState()

    const handleCurrentMovie = () => {
        setModal(true)
        setCurrentMovie(movie)
    }

    useEffect(() => {
        const randomMovie = trending[Math.floor(Math.random() * trending.length)]
        setMovie(randomMovie)
    }, [trending])

    const count = Math.floor(movie.vote_average)


    return (
        <div className={'flex flex-col ml-10 mt-5  space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:pb-12 lg:justify-end'}>
            <div className={'absolute -z-10 top-0 left-0 h-[100vh] w-full'}>
                <Image
                    src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`}
                    alt={movie?.title}
                    className={'object-cover'} fill />
            </div>

            <p className={'text-slate-100 bg-black w-[120px] py-1 text-2xl flex justify-center items-center border-2 border-red rounded-2xl'}>{movie?.media_type}</p>
            <ReactStars count={10} value={count} edit={false} size={24} color1={'white'} color2={'yellow'} />
            <h1 className={'text-3xl text-slate-100 font-bold md:text-4xl lg:text-5xl shadow_text'}>{movie?.name || movie?.title}</h1>
            <p className={'max-w-xs text-slate-100 md:max-w-lg lg:max-w-2xl text-xl text-shadow-md shadow_text md:text-lg lg:text-2xl'}>{<>{movie?.overview?.slice(0, 60)}...</>}</p>

            <button onClick={handleCurrentMovie} className={'flex justify-center items-center gap-2 bg-red-600 hover:bg-red-500 font-bold text-slate-100 w-[250px] h-[60px] rounded-full text-xl transition-colors duration-500'}>
                <BsFillPlayFill className={'w-8 h-8'} />
                Watch Now
            </button>
        </div>
    )
}

export default Hero

