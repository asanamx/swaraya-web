import { JetBrains_Mono } from 'next/font/google';
import BrandFinalClient from './BrandFinalClient';

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'] });

export default function Page() {
  return <BrandFinalClient monoCls={jetbrainsMono.className} />;
}
