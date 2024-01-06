/** @type {import('next').NextConfig} */
const nextConfig = {
    "output": "export",
    reactStrictMode: true,
    basePath: "/stucoin-frontend",
    assetPrefix: "/stucoin-frontend/",
    images: {
        loader: "imgix",
        path: "/stucoin-frontend/public",
    },
}

module.exports = nextConfig
