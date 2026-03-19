import Link from "next/link";

export default function PayCancelPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-stone-800/50 border border-stone-700/50 flex items-center justify-center">
        <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-amber-50 mb-4">Checkout cancelled</h1>
      <p className="text-stone-400 text-lg mb-8">
        No worries — you haven&apos;t been charged. Your candle will be here when you&apos;re ready.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/#collection"
          className="px-6 py-3 rounded-lg bg-amber-700 text-amber-50 font-semibold hover:bg-amber-600 transition-colors"
        >
          Continue shopping
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-lg border border-stone-700 text-stone-300 font-semibold hover:border-stone-500 hover:text-amber-100 transition-colors"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}
