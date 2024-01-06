/** @type {import('next').NextConfig} */
const nextConfig = {
    "output": "export",
    reactStrictMode: true,
    basePath: "",
    assetPrefix: "/stucoin-frontend/",
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cpprian.github.io',
            port: '',
            pathname: '/stucoin-frontend/public',
          },
        ],
      },
}

module.exports = nextConfig
