/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: true,

  env: {
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_API_KEY: process.env.NEXTPUBLICAPIKEY
  },
  images: {
    domains: ['image.tmdb.org', 'files.stripe.com', 'rb.gy', 'img.freepik.com']
  },
 pageExtensions: ['row.props.ts', 'plan-card.props.ts', 'hero.props.ts', 'subscription-list.props', 'text-field.props', '']
}

module.exports = nextConfig
