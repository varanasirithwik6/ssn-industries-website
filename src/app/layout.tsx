import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SmartHubWidget from '@/components/common/SmartHubWidget';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'SSN Industries | Premium Roofing Sheets & Industrial Materials',
    template: '%s | SSN Industries'
  },
  description: 'Enterprise supplier of structural steel, premium roofing sheets, ERW pipes, UPVC profiles, and high yield strength TMT rebar reinforcement.',
  metadataBase: new URL('https://www.ssn-industries.in'),
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'SSN Industries | Premium Roofing Sheets & Industrial Materials',
    description: 'Enterprise supplier of structural steel, premium roofing sheets, ERW pipes, UPVC profiles, and high yield strength TMT rebar reinforcement.',
    url: 'https://www.ssn-industries.in',
    siteName: 'SSN Industries',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/home-hero-materials.jpg',
        width: 1200,
        height: 630,
        alt: 'SSN Industries Premium Steel Warehouse'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SSN Industries | Premium Roofing Sheets & Industrial Materials',
    description: 'Enterprise supplier of structural steel, premium roofing sheets, ERW pipes, UPVC profiles, and high yield strength TMT rebar reinforcement.',
    images: ['/home-hero-materials.jpg']
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "SSN Industries",
  "image": "https://www.ssn-industries.in/home-hero-materials.jpg",
  "description": "SSN Industries manufactures and supplies premium building materials, reinforcement TMT rebars, heavy-duty hollow sections, and custom roofing sheets.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Chittapullivalasa, Veeraghattam",
    "addressLocality": "Veeraghattam",
    "addressRegion": "Andhra Pradesh",
    "postalCode": "532460",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 18.6929354,
    "longitude": 83.5868741
  },
  "url": "https://www.ssn-industries.in",
  "telephone": "+917780224863",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-brand-slate dark:text-gray-100">
        {/* Skip Link for screen readers and keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-brand-amber focus:text-brand-slate focus:font-bold focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-slate focus:ring-offset-2"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
          {children}
        </main>
        <Footer />
        <SmartHubWidget />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
