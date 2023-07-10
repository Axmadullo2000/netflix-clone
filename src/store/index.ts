import {create} from 'zustand'

import {IMovies} from "@/interfaces/app.interface";

interface InfoState {
    modal: boolean,
    currentMovie: IMovies,
    setModal: (bool: boolean) => void,
    setCurrentMovie: (currentMovie: IMovies) => void
}


export const userInfoState = create<InfoState>()((set) => ({
    modal: false,
    currentMovie: {} as IMovies,
    setModal: (bool: boolean) => set(state => ({...state, modal: bool})),
    setCurrentMovie: (currentMovie: IMovies) => set(state => ({...state, currentMovie: currentMovie}))
}))

