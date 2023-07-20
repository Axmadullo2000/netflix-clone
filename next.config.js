/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org', 'files.stripe.com', 'rb.gy', 'img.freepik.com']
  }
}

module.exports = nextConfig
