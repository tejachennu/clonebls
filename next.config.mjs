/** @type {import('next').NextConfig} */
const nextConfig = {

    output: 'export',
    images: {
        unoptimized: true,
        domains: ['https://blsinternational.ca', 'blsinternational.ca', 'localhost','res.cloudinary.com'], // Add your image domains here
    },

};

export default nextConfig;
