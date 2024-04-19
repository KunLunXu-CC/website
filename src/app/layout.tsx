import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import Providers from './(Providers)';
import './globals.css';
import '@kunlunxu/brick/dist/@kunlunxu/brick.css'; // TODO: 按需加载
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "昆仑虚",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <Script src="//at.alicdn.com/t/c/font_1141137_6y5nxdm3y9q.js" />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
