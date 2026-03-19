import Link from "next/link";

export default function PaySuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-900/30 border border-amber-700/30 flex items-center justify-center">
        <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-amber-50 mb-4">Order confirmed!</h1>
      <p className="text-stone-400 text-lg mb-8">
        Thank you for your purchase. You&apos;ll receive a confirmation email shortly.
        <br />
        <span className="text-xs text-stone-600 mt-2 block">[DEMO] This is a portfolio demonstration — no real order was placed.</span>
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 rounded-lg bg-amber-700 text-amber-50 font-semibold hover:bg-amber-600 transition-colors"
      >
        Back to Lume
      </Link>
    </div>
  );
}
