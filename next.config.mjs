/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // remotePatterns: [
        //     {
        //         protocol: 'http',
        //         hostname: 'localhost',
        //         port: '8000',
        //         pathname: '/**',
        //         search: '',
        //     },
        // ],
        domains: ['localhost'], // Add 'localhost' if using external images from it
    },
};

export default nextConfig;
