import type { Config } from "tailwindcss";

const config: Config = {
  // src 폴더 전체를 스캔하도록 경로를 잡습니다.
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        night: "#1b1340",
        "night-soft": "#2a2055",
        moongold: "#e8c474",
        ink: "#171717",
        mist: "#f4f2fb",
      },
      maxWidth: {
        app: "28rem", // 모바일 앱 폭(448px)
      },
    },
  },
  plugins: [],
};

export default config;
