import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mr4v9rgsnq.ufs.sh", // 👈 replace with your actual domain
      },
    ],
  },
};

export default config;
