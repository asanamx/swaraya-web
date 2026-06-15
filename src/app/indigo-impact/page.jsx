import { JetBrains_Mono } from 'next/font/google';
import IndigoImpactClient from './IndigoImpactClient';

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'] });

export default function Page() {
  return <IndigoImpactClient monoCls={jetbrainsMono.className} />;
}
