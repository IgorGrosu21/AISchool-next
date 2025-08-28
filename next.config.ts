import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL(`${process.env.NEXT_PUBLIC_DJANGO_HOST_PROD}/media/**`)],
  },
};
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
 