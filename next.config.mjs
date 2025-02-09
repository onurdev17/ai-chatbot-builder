/** @type {import('next').NextConfig} */

const nextConfig = {
  // reactStrictMode: false
  images: {
    domains: ["cwsxpgwvvnfzugcsrvyv.supabase.co"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "query",
            key: "maintenance",
            value: "true",
          },
        ],
        destination: "/maintenance",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
