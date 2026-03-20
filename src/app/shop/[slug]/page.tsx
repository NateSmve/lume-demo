"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct, formatPrice, type Product } from "@/lib/products";
import { use } from "react";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const maybeProduct = getProduct(slug);
  if (!maybeProduct) return notFound();
  const product: Product = maybeProduct;

  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleBuy() {
    setState("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: `Lume — ${product.name} Candle`,
          amount: product.priceCents,
          slug: product.slug,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed.");
      window.location.href = data.url;
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <Link
        href="/#collection"
        className="inline-flex items-center gap-2 text-sm text-stone-400 underline decoration-stone-600 hover:text-amber-200 hover:decoration-amber-400 transition-colors mb-10"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to collection
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Product visual */}
        <div className={`relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br ${product.gradient}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-36 h-52 rounded-2xl bg-white/10 border border-white/20 flex flex-col items-center justify-center backdrop-blur-sm">
              <div className="w-2 h-7 bg-amber-300/80 rounded-full mb-1.5 animate-pulse" />
              <div className="w-24 h-28 rounded-xl bg-white/10 border border-white/10 flex items-end justify-center pb-3">
                <span className="text-white/60 text-xs font-semibold tracking-[0.15em] uppercase">
                  {product.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Product info */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400 mb-2 block">
            Lume Candle Co.
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-amber-50 mb-3">
            {product.name}
          </h1>
          <p className="text-lg text-amber-400 font-semibold mb-6">
            {formatPrice(product.priceCents)}
          </p>
          <p className="text-stone-400 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Scent notes */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-stone-300 mb-3">Scent Notes</p>
            <div className="flex flex-wrap gap-2">
              {product.notes.map((note) => (
                <span
                  key={note}
                  className="px-3 py-1.5 text-sm rounded-full bg-stone-800/80 text-stone-300 border border-stone-700/50"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
            <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800/50">
              <p className="text-stone-400 mb-1">Weight</p>
              <p className="text-stone-200 font-medium">{product.weight}</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800/50">
              <p className="text-stone-400 mb-1">Burn Time</p>
              <p className="text-stone-200 font-medium">{product.burnTime}</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800/50">
              <p className="text-stone-400 mb-1">Wax</p>
              <p className="text-stone-200 font-medium">100% Natural Soy</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800/50">
              <p className="text-stone-400 mb-1">Wick</p>
              <p className="text-stone-200 font-medium">Cotton-Core</p>
            </div>
          </div>

          {state === "error" && (
            <div className="px-4 py-3 rounded-lg bg-red-950 border border-red-800 text-red-300 text-sm mb-4">
              {errorMsg}
            </div>
          )}

          <button
            onClick={handleBuy}
            disabled={state === "loading"}
            className="w-full px-8 py-3.5 rounded-lg bg-amber-700 text-amber-50 font-semibold text-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {state === "loading" ? "Redirecting to checkout…" : `Buy Now — ${formatPrice(product.priceCents)}`}
          </button>

          <p className="text-xs text-stone-400 mt-3 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
            Secure checkout powered by Stripe. Free shipping on orders over $100.
          </p>
        </div>
      </div>

      {/* Other products */}
      <div className="mt-24">
        <h2 className="text-2xl font-bold text-amber-50 mb-8">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products
            .filter((p) => p.slug !== product.slug)
            .map((p) => (
              <Link
                key={p.slug}
                href={`/shop/${p.slug}`}
                className="group rounded-2xl border border-stone-800/60 bg-stone-900/50 overflow-hidden hover:border-amber-800/40 transition-all duration-300"
              >
                <div className={`relative aspect-[4/3] bg-gradient-to-br ${p.gradient}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-24 rounded-xl bg-white/10 border border-white/20 flex flex-col items-center justify-center">
                      <div className="w-1 h-4 bg-amber-300/80 rounded-full mb-1" />
                      <div className="w-10 h-12 rounded-lg bg-white/10 border border-white/10" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-amber-50 group-hover:text-amber-200 transition-colors">
                      {p.name}
                    </h3>
                    <span className="text-amber-400 font-semibold">{formatPrice(p.priceCents)}</span>
                  </div>
                  <p className="text-sm text-stone-400 mt-1">{p.tagline}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
