import * as process from "process";

const public_domain = process.env.NEXT_PUBLIC_DOMAIN as string;
const base_url = process.env.NEXTPUBLICDOMAIN as string
const api_key = process.env.NEXT_PUBLIC_APIKEY as string

export const API_REQUEST = {
    trending: `${base_url}/trending/movie/week?api_key=${api_key}`,
    tvTop: `${base_url}/trending/tv/day?api_key=${api_key}`,
    products_list: `${public_domain}/api/products`,
    subscription: `${public_domain}/api/subscription`
}
