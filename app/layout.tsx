import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "./components/nav";
import Footer from "./components/footer";
import "./global.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nyles' Portfolio",
  description: "Nyles' Portfolio",
  icons: {
    icon: '/images/favicon.svg',
  },
};

const cx = (...classes: any[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'bg-black text-white h-dvh',
        geistSans.variable,
        geistMono.variable
      )}
    >
      <body className="antialiased max-w-4xl mx-16 mt-8 lg:mx-auto md:px-30">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0 h-screen">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
