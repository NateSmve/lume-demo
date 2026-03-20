import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

/**
 * POST /api/stripe/checkout
 * Body: { productName: string; amount: number; slug?: string; email?: string }
 *
 * Creates a Stripe Checkout session with ad-hoc pricing.
 * This demo uses price_data so it works without pre-created Stripe Products.
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { productName, amount, slug, email } = body;

  if (!productName || !amount) {
    return NextResponse.json(
      { error: "productName and amount are required." },
      { status: 400 }
    );
  }

  const origin =
    req.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://lume-demo.up.railway.app";

  try {
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productName,
              description: "Hand-poured soy candle, 8 oz — Lume Candle Co. [DEMO]",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      ...(email ? { customer_email: email } : {}),
      metadata: { product: slug || "", demo: "true" },
      success_url: `${origin}/pay/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pay/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
