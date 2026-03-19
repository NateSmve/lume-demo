import Link from "next/link";
import { buildMeta } from "@/lib/seo";
import { products } from "@/lib/products";
import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = buildMeta({
  title: "Handcrafted Candles",
  description:
    "Lume — Handcrafted candles for moments that matter. Explore our collection of small-batch, sustainably sourced soy candles.",
});

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-6 pt-28 pb-24 text-center">
        {/* Ambient glow */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-900/20 blur-[120px]" />
        </div>

        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-amber-950/60 border border-amber-800/40 text-amber-300 mb-6 tracking-wider uppercase">
          Small-batch &middot; Sustainably sourced
        </span>
        <h1 className="text-5xl sm:text-7xl font-bold text-amber-50 mb-6 leading-tight tracking-tight">
          Handcrafted candles
          <br />
          <span className="text-amber-400">for moments that matter.</span>
        </h1>
        <p className="text-xl text-stone-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Each Lume candle is hand-poured in small batches using 100% natural soy
          wax and fine fragrance oils. Designed to transform any space into a
          sanctuary.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#collection"
            className="px-8 py-3.5 rounded-lg bg-amber-700 text-amber-50 font-semibold hover:bg-amber-600 transition-colors text-lg"
          >
            Shop the Collection
          </Link>
          <Link
            href="#story"
            className="px-8 py-3.5 rounded-lg border border-stone-700 text-stone-300 font-semibold hover:border-stone-500 hover:text-amber-100 transition-colors text-lg"
          >
            Our Story
          </Link>
        </div>
      </section>

      {/* ── The Collection ──────────────────────────────────────────────── */}
      <section id="collection" className="max-w-6xl mx-auto px-6 pb-28">
        <div className="text-center mb-14">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500 mb-3">
            The Collection
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-amber-50">
            Three signature scents
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* ── Our Story ──────────────────────────────────────────────────── */}
      <section id="story" className="border-t border-stone-800/50 bg-stone-900/30">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500 mb-3">
                Our Story
              </h2>
              <p className="text-3xl sm:text-4xl font-bold text-amber-50 mb-6">
                Born from a love of craft
              </p>
              <div className="space-y-4 text-stone-400 leading-relaxed">
                <p>
                  Lume began with a simple idea: that the right scent can change the
                  way a moment feels. We set out to create candles that do more than
                  fill a room — they set a mood, spark a memory, create a ritual.
                </p>
                <p>
                  Every candle in our collection is hand-poured in small batches.
                  We use 100% natural soy wax, cotton-core wicks, and premium
                  fragrance oils blended in-house. No shortcuts, no synthetics,
                  no compromise.
                </p>
                <p>
                  From sourcing to pouring to packaging, every step is intentional.
                  Because when you light a Lume candle, you should feel the care
                  that went into making it.
                </p>
              </div>
            </div>
            {/* Visual element — abstract warm gradient */}
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-800/40 via-orange-900/30 to-stone-950" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-44 rounded-2xl bg-gradient-to-b from-amber-600/30 to-amber-900/20 border border-amber-700/30 flex items-center justify-center">
                  <div className="w-2 h-6 bg-amber-400/60 rounded-full animate-pulse" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-stone-950/80 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── The Craft ──────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500 mb-3">
            The Craft
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-amber-50">
            Made with intention
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Source",
              body: "We select the finest natural soy wax and premium fragrance oils, prioritizing sustainable and ethically sourced materials.",
            },
            {
              step: "02",
              title: "Blend",
              body: "Each fragrance is blended in-house and tested through multiple iterations until the scent profile is exactly right.",
            },
            {
              step: "03",
              title: "Pour",
              body: "Every candle is hand-poured in small batches at precise temperatures to ensure a clean, even burn every time.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <span className="inline-block text-4xl font-bold text-amber-700/40 mb-4">
                {item.step}
              </span>
              <h3 className="text-xl font-semibold text-amber-100 mb-3">
                {item.title}
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="border-t border-stone-800/50 bg-stone-900/30">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-50 mb-4">
            Ready to find your scent?
          </h2>
          <p className="text-stone-400 mb-8 max-w-xl mx-auto">
            Explore our collection and bring a new warmth to your space.
            Free shipping on orders over $100.
          </p>
          <Link
            href="#collection"
            className="inline-block px-8 py-3.5 rounded-lg bg-amber-700 text-amber-50 font-semibold hover:bg-amber-600 transition-colors text-lg"
          >
            Shop the Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
