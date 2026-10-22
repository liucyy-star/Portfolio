/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Temporary: remove to bring back the BenefitsCal case study page.
      {
        source: "/work/benefitsCal",
        destination: "/under-construction",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
