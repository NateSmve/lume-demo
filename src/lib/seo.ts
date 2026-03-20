import type { Metadata } from "next";

interface SeoOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lume-ecommerce-demo-new.up.railway.app";
const siteName = "Lume";
const defaultImage = "/og-image.png";

export function buildMeta({
  title,
  description,
  path = "",
  image = defaultImage,
  noIndex = false,
}: SeoOptions): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  const url = `${siteUrl}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    robots: noIndex ? "noindex,nofollow" : "index,follow",
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
