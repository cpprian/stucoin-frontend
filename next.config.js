/** @type {import('next').NextConfig} */
const nextConfig = {
    "output": "export",
    reactStrictMode: true,
    basePath: "/stucoin-frontend",
    assetPrefix: "/stucoin-frontend/",
    images: {
        loader: "imgix",
        path: "https://github.com/cpprian/stucoin-frontend",
    },
}

module.exports = nextConfig
