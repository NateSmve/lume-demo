import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-02-25.clover",
    });
  }
  return _stripe;
}

export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return (getStripe() as Record<string | symbol, unknown>)[prop];
  },
});

/**
 * Create a Stripe Checkout session for a one-time deposit payment.
 *
 * @param params.priceId  - Stripe Price ID (created in Stripe Dashboard)
 * @param params.email    - Pre-fill customer email
 * @param params.name     - Customer name for metadata
 * @param params.label    - Product label shown in Checkout
 * @param params.successUrl - Redirect after payment
 * @param params.cancelUrl  - Redirect on cancel
 */
export async function createDepositSession({
  priceId,
  email,
  name,
  label,
  successUrl,
  cancelUrl,
}: {
  priceId: string;
  email: string;
  name?: string;
  label?: string;
  successUrl: string;
  cancelUrl: string;
}) {
  return stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: email || undefined,
    metadata: { clientName: name || "", clientEmail: email, label: label || "" },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
}

/**
 * Create a Stripe Checkout session for a monthly subscription.
 */
export async function createSubscriptionSession({
  priceId,
  email,
  successUrl,
  cancelUrl,
}: {
  priceId: string;
  email: string;
  successUrl: string;
  cancelUrl: string;
}) {
  return stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: email || undefined,
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
}

export function formatCents(cents: number): string {
  return `$${(cents / 100).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}
