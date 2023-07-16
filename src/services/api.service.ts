import * as process from "process";

const base_url = process.env.NEXT_PUBLIC_DOMAIN as string
const api_key = process.env.NEXT_PUBLIC_API_KEY as string
const local_url = process.env.NEXT_PUBLIC_LOCAL_DOMAIN as string

export const API_REQUEST = {
    trending: `${base_url}/trending/movie/week?api_key=${api_key}`,
    tv: `${base_url}/trending/tv/day?api_key=${api_key}`,
    products: `http://localhost:3000//api/products/`
}
