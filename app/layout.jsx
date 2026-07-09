import Script from "next/script";
import { DM_Sans, Raleway, Inter, Rajdhani, JetBrains_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

// Google Analytics 4 measurement ID from Firebase console.
// This value is a public identifier and safe to commit.
const GA_ID = "G-RCH7ZZ3T12";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-raleway",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DapplePot | AI Agent Security & Monitoring Platform",
    template: "%s | DapplePot",
  },
  description:
    "Monitor, control, and protect your AI agent fleet in real time. DapplePot provides runtime security, session replay, and threat detection — covering the OWASP LLM Top 10 and ASI Top 10.",
  alternates: {
    canonical: "/",
    types: {
      "text/plain": [{ url: "/llms.txt", title: "LLMs.txt" }],
    },
  },
  openGraph: {
    type: "website",
    siteName: "DapplePot",
    title: "DapplePot | AI Agent Security & Monitoring Platform",
    description:
      "Monitor, control, and protect your AI agent fleet in real time. Runtime security, session replay, and threat detection for AI agents.",
    url: SITE_URL,
    images: [{ url: "/dapplePotLogo.png" }],
  },
  twitter: {
    card: "summary",
    title: "DapplePot | AI Agent Security & Monitoring Platform",
    description:
      "Monitor, control, and protect your AI agent fleet in real time. Runtime security, session replay, and threat detection for AI agents.",
    images: ["/dapplePotLogo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DapplePot",
  url: SITE_URL,
  logo: `${SITE_URL}/dapplePotLogo.png`,
  description:
    "DapplePot provides runtime security, session replay, and real-time threat detection for AI agent fleets.",
  sameAs: ["https://docs.dapplepot.com"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DapplePot",
  url: SITE_URL,
  description:
    "Monitor, control, and protect your AI agent fleet in real time. Runtime security, session replay, and threat detection — covering the OWASP LLM Top 10 and ASI Top 10.",
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "DapplePot",
  applicationCategory: "SecurityApplication",
  operatingSystem: "Cloud",
  description:
    "AI agent fleet monitoring and security platform. Provides runtime security, session replay, prompt injection detection, data leakage prevention, and OWASP LLM Top 10 coverage.",
  url: SITE_URL,
  publisher: {
    "@type": "Organization",
    name: "DapplePot",
    url: SITE_URL,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${raleway.variable} ${inter.variable} ${rajdhani.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
