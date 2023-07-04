export interface IMovies {
    adult: boolean,
    backdrop_path: string,
    id: number,
    name: string,
    title: string,
    overview: string,
    media_type: string,
    poster_path: string,
    genre_ids: number[],
    popularity: number,
    release_date: string,
    first_air_date: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}
