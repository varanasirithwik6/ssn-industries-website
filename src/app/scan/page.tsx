import { Suspense } from 'react';
import type { Metadata } from 'next';
import ScanPageClient from '@/components/tools/ScanPageClient';

export const metadata: Metadata = {
  title: 'SSN Industries - Digital Business Hub',
  description: 'Corporate business card and digital links hub for SSN Industries.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://www.ssn-industries.in/scan',
  },
};

export default function ScanPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-amber border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ScanPageClient />
    </Suspense>
  );
}
