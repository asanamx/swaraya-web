import { Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import IconLabClient from './IconLabClient';

const instrumentSerif = Instrument_Serif({ subsets: ['latin'], weight: '400' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'] });

export default function Page() {
  return (
    <IconLabClient
      serifCls={instrumentSerif.className}
      monoCls={jetbrainsMono.className}
    />
  );
}
