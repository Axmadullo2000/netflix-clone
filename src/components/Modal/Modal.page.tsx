import React, {useContext, useEffect, useState} from 'react';
import MuiModal from '@mui/material/Modal'
import {TiTimes} from "react-icons/ti";
import ReactPlayer from "react-player";
import {AiOutlinePlus} from "react-icons/ai";
import { addDoc, collection } from "firebase/firestore";


import {userInfoState} from "@/store";
import {Element} from "@/interfaces/app.interface";
import {db} from "@/firebase";
import {AuthContext} from "@/context/auth.context";
import {useRouter} from "next/router";


function Modal() {
    const {modal, setModal, currentMovie} = userInfoState()
    const [trailer, setTrailer] = useState<string>('')
    const {user} = useContext(AuthContext)
    const router = useRouter()


    const api = `https://api.themoviedb.org/3/${currentMovie.media_type === 'tv' ? 'tv' : 'movie'}/${currentMovie.id}/videos?api_key=9dcd6d2cd8af29cf72b7047e139de240`

    const handleClose = () => {
        setModal(false)
    }

    useEffect(() => {
        const fetchMovies = async () => {
            const data = await fetch(api).then(res => res.json())

            if (data?.results) {
                const index = data.results.findIndex((item: Element) => item.type === 'Trailer')
                setTrailer(data.results[index]?.key)
            }
        }

        fetchMovies()

    //     eslint-disable-next-line
    })

    const addProductList = async () => {
        try {
            const docRef = await addDoc(collection(db, "product"), {
                token: user?.uid,
                product: currentMovie
            })

            router.replace(router.asPath)
            window.location.reload()
        }catch (e) {
        }
    }



    return (
        <MuiModal
            open={modal}
            onClose={handleClose}
            className={'!fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll no-scrollbar rounded'}>
            <>
                <div className={'relative flex pt-[55%] scrollbar-hide'}>
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailer}`}
                        loop
                        controls
                        playing
                        width={'100%'}
                        height={'100%'}
                        style={{position: 'absolute', top: 0, left: 0}}
                    />
                </div>


                <div className={'pl-8 pt-8 h-[50%] text-xl w-full bg-black'}>
                    <div className={'flex gap-2'}>
                        <p className={'text-green-600'}>{Math.floor(currentMovie?.vote_average * 10)}% Match</p>
                        <p className={'text-slate-100'}>{currentMovie?.release_date}</p>
                        <p className={'text-slate-100 rounded px-2 border-2 border-white flex justify-center items-center'}>HD</p>
                        <button onClick={addProductList} className={'rounded-full border-2 border-slate-200 hover:border-slate-500'}>
                            <AiOutlinePlus color={'white'} className={'w-9 h-9 rounded-2xl hover:bg-red-600'}/>
                        </button>
                    </div>

                    <div className={'mt-4'}>
                        <p className={'text-slate-100'}>{currentMovie?.overview}</p>
                        <p className={'text-red-600 mt-4 text-2xl'}>Original language: {currentMovie?.original_language}</p>
                        <p className={'text-slate-100 mt-4 text-xl'}>Total votes: {currentMovie?.vote_count}</p>
                    </div>

                </div>
                <button onClick={handleClose}
                        className={'absolute right-5 top-5 bg-black/80 hover:bg-black/50 w-10 h-10 rounded-full flex justify-center items-center'}>
                    <TiTimes
                        className={' cursor-pointer w-7 h-7'}
                        color={'white'} />
                </button>
            </>
        </MuiModal>
    )
}

export default Modal
