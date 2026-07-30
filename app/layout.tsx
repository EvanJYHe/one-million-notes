import type { Metadata } from "next";
import "@fontsource/architects-daughter/400.css";
import "@fontsource/chewy/400.css";
import "@fontsource-variable/dynapuff/wght.css";
import "@fontsource/gloria-hallelujah/400.css";
import "@fontsource/kalam/400.css";
import "@fontsource/patrick-hand/400.css";
import "@fontsource/schoolbell/400.css";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "https://one-million-notes.evan-he24.workers.dev";
const siteDescription =
  "Join a collaborative message wall for the world. Share a thought, spread some joy, and help build a collection of one million notes.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "One Million Notes",
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      {
        url: "/favicon-large-v2.ico",
        sizes: "16x16 32x32 48x48 64x64",
        type: "image/x-icon",
      },
      {
        url: "/art/sticky-stack-icon-v2.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: {
      url: "/art/sticky-stack-apple-icon-v2.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
  openGraph: {
    title: "One Million Notes",
    description: siteDescription,
    url: "/",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "A smiling yellow sticky note layered over pink and blue notes",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "One Million Notes",
    description: siteDescription,
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
