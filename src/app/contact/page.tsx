"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

type FormState = "idle" | "submitting" | "success" | "error";

const INQUIRIES = [
  "Wholesale inquiry",
  "Custom order",
  "General question",
  "Other",
];

export default function ContactPage() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      service: fd.get("inquiry"),
      message: fd.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }
      setState("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-900/30 border border-amber-700/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-amber-50 mb-4">Message sent!</h1>
        <p className="text-stone-400 text-lg mb-8">
          Thanks for reaching out. We&apos;ll get back to you soon.
          <br />
          <span className="text-xs text-stone-500 mt-2 block">[DEMO] This is a portfolio demonstration — no real message was sent.</span>
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

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-amber-50 mb-4">Get in touch</h1>
        <p className="text-stone-400 text-lg">
          Have a question about our candles, interested in wholesale, or want a
          custom order? We&apos;d love to hear from you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-stone-300 mb-2">
              Your name <span className="text-amber-400">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Jane Smith"
              className="w-full px-4 py-3 rounded-lg bg-stone-900 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-stone-300 mb-2">
              Email <span className="text-amber-400">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="jane@example.com"
              className="w-full px-4 py-3 rounded-lg bg-stone-900 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label htmlFor="inquiry" className="block text-sm font-medium text-stone-300 mb-2">
            What can we help with?
          </label>
          <select
            id="inquiry"
            name="inquiry"
            defaultValue=""
            className="w-full px-4 py-3 rounded-lg bg-stone-900 border border-stone-700 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors appearance-none"
          >
            <option value="">Select an option…</option>
            {INQUIRIES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-stone-300 mb-2">
            Message <span className="text-amber-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us what you're looking for…"
            className="w-full px-4 py-3 rounded-lg bg-stone-900 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none"
          />
        </div>

        {state === "error" && (
          <div className="px-4 py-3 rounded-lg bg-red-950 border border-red-800 text-red-300 text-sm">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={state === "submitting"}
          className="w-full sm:w-auto px-8 py-3 rounded-lg bg-amber-700 text-amber-50 font-semibold hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {state === "submitting" ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
}
