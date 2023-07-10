const base_url = process.env.NEXT_PUBLIC_DOMAIN as string
const api_key = process.env.NEXT_PUBLIC_API_KEY as string

export const API_REQUEST = {
    trending: `${base_url}/trending/movie/week?api_key=${api_key}`,
    tv: `${base_url}/trending/tv/day?api_key=${api_key}`
}
