import {IMovies} from "@/interfaces/app.interface";

export interface RowProps {
    movies: IMovies[],
    title: string,
    isBig: boolean
}
