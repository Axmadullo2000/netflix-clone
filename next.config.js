/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: true,

  env: {
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY
  },
  images: {
    domains: ['image.tmdb.org', 'files.stripe.com', 'rb.gy', 'img.freepik.com']
  },
  pageExtensions: ['plan-card.props.ts', 'row.props.ts', 'subscription-list.props.ts', 'hero.props.ts', 'hero.props.ts', 'text-fields.props.ts']
}

module.exports = nextConfig
