import type { Metadata } from 'next';
import ToolsClient from '@/components/tools/ToolsClient';

export const metadata: Metadata = {
  title: 'Calculators & Estimation Tools',
  description: 'Calculate theoretical weights for TMT rebars, structural channels, steel pipes, and estimate custom roofing sheets layout counts in feet.',
};

export default function ToolsPage() {
  return <ToolsClient />;
}
