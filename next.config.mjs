/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/llms.txt",
        headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }],
      },
    ];
  },
};

export default nextConfig;
