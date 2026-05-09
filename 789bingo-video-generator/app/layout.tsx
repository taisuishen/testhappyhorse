import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "抖音热门视频生成",
  description: "789Bingo AI video generator",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
