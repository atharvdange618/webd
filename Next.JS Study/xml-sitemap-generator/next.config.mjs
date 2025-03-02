/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Only apply this for server builds
    if (isServer) {
      config.module.rules.push({
        test: /\.js\.map$/,
        loader: "ignore-loader",
      });
    }
    return config;
  },
};

export default nextConfig;
