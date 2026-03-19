/**
 * Lume — Demo product catalog.
 * All products are fictional. This is a portfolio demo by SMVE Web Dev.
 */

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  priceCents: number;
  weight: string;
  burnTime: string;
  gradient: string; // CSS gradient for product card visual
  notes: string[];
}

export const products: Product[] = [
  {
    slug: "ember",
    name: "Ember",
    tagline: "Smoky warmth for quiet evenings",
    description:
      "A rich blend of cedar wood and golden amber, layered over a base of smoked vanilla. Ember fills a room with the warmth of a fireside retreat.",
    priceCents: 3800,
    weight: "8 oz",
    burnTime: "45 hours",
    gradient: "from-amber-900 via-orange-800 to-red-950",
    notes: ["Cedar", "Amber", "Smoked Vanilla"],
  },
  {
    slug: "bloom",
    name: "Bloom",
    tagline: "Fresh florals for bright mornings",
    description:
      "Jasmine petals and white tea open into a heart of soft peony, grounded by a whisper of sandalwood. Bloom brings the feeling of a sunlit garden indoors.",
    priceCents: 3400,
    weight: "8 oz",
    burnTime: "45 hours",
    gradient: "from-pink-900 via-rose-800 to-fuchsia-950",
    notes: ["Jasmine", "White Tea", "Peony"],
  },
  {
    slug: "drift",
    name: "Drift",
    tagline: "Coastal calm for any space",
    description:
      "Sea salt and driftwood mingle with bergamot and sage. Drift captures the serenity of a windswept coastline at golden hour.",
    priceCents: 3600,
    weight: "8 oz",
    burnTime: "45 hours",
    gradient: "from-slate-800 via-cyan-900 to-teal-950",
    notes: ["Sea Salt", "Driftwood", "Bergamot"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`;
}
