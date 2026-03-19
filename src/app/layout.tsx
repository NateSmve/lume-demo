import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import DemoBanner from "@/components/DemoBanner";
import { buildMeta } from "@/lib/seo";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = buildMeta({
  title: "Handcrafted Candles",
  description:
    "Lume — Handcrafted candles for moments that matter. A demo project by SMVE Web Dev.",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} font-sans antialiased bg-stone-950 text-stone-100`}
      >
        <DemoBanner />
        <Nav />
        <main>{children}</main>

        {/* Footer */}
        <footer className="border-t border-stone-800/50 py-12 mt-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <p className="font-bold text-lg tracking-[0.2em] uppercase text-amber-100 mb-3">
                  Lume
                </p>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Handcrafted candles for moments that matter.
                  <br />
                  Small-batch. Sustainably sourced.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-300 mb-3">
                  Quick Links
                </p>
                <div className="flex flex-col gap-2 text-sm text-stone-500">
                  <a href="/#collection" className="hover:text-amber-200 transition-colors">Shop</a>
                  <a href="/#story" className="hover:text-amber-200 transition-colors">Our Story</a>
                  <a href="/contact" className="hover:text-amber-200 transition-colors">Contact</a>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-300 mb-3">
                  Details
                </p>
                <div className="flex flex-col gap-2 text-sm text-stone-500">
                  <p>Free shipping on orders over $100</p>
                  <p>Hand-poured in small batches</p>
                  <p>100% natural soy wax</p>
                </div>
              </div>
            </div>
            <div className="border-t border-stone-800/50 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-600">
              <p>&copy; {new Date().getFullYear()} Lume. All rights reserved.</p>
              <p>
                [DEMO] Built by{" "}
                <a
                  href="https://smve.cloud"
                  className="text-amber-500/70 hover:text-amber-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SMVE Web Dev
                </a>{" "}
                as a portfolio piece.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
