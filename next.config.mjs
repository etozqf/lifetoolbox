/** @type {import('next').NextConfig} */
const isStaticExport =
  process.env.NODE_ENV === "production" ||
  process.env.CF_PAGES === "1" ||
  process.env.CI === "true";

const nextConfig = {
  ...(isStaticExport ? { output: "export" } : {}),
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
