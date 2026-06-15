import { JetBrains_Mono } from 'next/font/google';
import IconVariantsClient from './IconVariantsClient';

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'] });

export default function Page() {
  return <IconVariantsClient monoCls={jetbrainsMono.className} />;
}
