import React, {useCallback, useRef} from 'react'
import Image from "next/image";
import ReactStars from 'react-stars'
import {Autoplay, Navigation, Pagination} from "swiper";

import {RowProps} from "@/pages/components/Row/row.props"

import {image_base} from "@/helpers/constants";
import {Swiper, SwiperSlide} from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';




function Row({movies, title, isBig=false}: RowProps) {
    const swiperRef = useRef(null);

    const prevSlide = useCallback(() => {
        // @ts-ignore
        swiperRef.current.swiper.slidePrev();
    }, [swiperRef]);

    const nextSlide = useCallback(() => {
        // @ts-ignore
        swiperRef.current.swiper.slideNext();
    }, [swiperRef]);


    return (
        <div className={'mb-10'}>
            <h2 className={'text-2xl text-slate-100 mb-4 ml-10 shadow_text'}>{title}</h2>

            <div className={'flex'}>
                <Swiper
                    style={{
                        // @ts-ignore
                        "--swiper-pagination-color": "red",
                        "--swiper-pagination-bullet-inactive-color": "yellow",
                        "--swiper-pagination-bullet-inactive-opacity": "1",
                        "--swiper-pagination-bullet-size": "14px",
                        "--swiper-pagination-bullet-horizontal-gap": "6px"
                    }}
                    ref={swiperRef}
                    spaceBetween={30}
                    slidesPerView={isBig ? 3 : 4}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    navigation={true}
                    centeredSlides={true}
                    loop
                    className={'cursor-pointer'}
                >
                    <div className={'relative'}>
                        {movies.map(movie => (
                            <SwiperSlide key={movie.id}>
                                <Image className={''} width={isBig ? 800 : 600} height={400} src={`${image_base}/${movie.poster_path || movie.backdrop_path}`} alt={movie.name} />
                                <ReactStars className={'absolute left-3 bottom-40'} count={10} value={movie.vote_average} edit={false} size={isBig ? 40 : 32} color1={'white'} color2={'yellow'} />
                                <p className={'absolute bottom-24 text-slate-100 left-5 text-2xl w-[200px] shadow_text'}>{movie.name || movie.title}</p>
                                <p className={`absolute bottom-24 ${isBig ? 'right-16' : 'right-2'} shadow_text text-2xl text-slate-100`}>({movie.vote_count})</p>
                            </SwiperSlide>
                        ))}
                    </div>
                </Swiper>
            </div>

        </div>
    )
}

export default Row

