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
    vote_count: number,
    original_language: 'en'
}

export interface Element {
    type: "Trailer",
    original_language: 'en'
}


export interface Products {
    id: string,
    images: string[],
    default_price: {
        id: string,
        unit_amount: number
    },
    metadata: {
        metadata: string
    }
    name: string,
}


export interface ISubscription {
    current_period_start: number,
    current_period_end: number,
    id: string,
    plan: {
        amount: number,
        active: boolean,
        nickname: string
    },
    default_payment_method: {
        card: {
            brand: string,
            exp_month: number,
            exp_year: number,
            last_four: string
        }
    },
    customer: {
        email: string
    }
}


