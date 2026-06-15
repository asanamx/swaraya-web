import { JetBrains_Mono } from 'next/font/google';
import NavbarVariantsClient from './NavbarVariantsClient';

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'] });

export default function Page() {
  return <NavbarVariantsClient monoCls={jetbrainsMono.className} />;
}
