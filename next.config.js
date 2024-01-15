/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "https://www.pexels.com/",
      "cdn.discordapp.com",
      "images.pexels.com",
      "images.unsplash.com",
    ],
  },
  async headers() {
    return [
      {
        source: "/api/(login*|register*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://star-food-bay.vercel.app" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
