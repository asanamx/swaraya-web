import {
  Instrument_Serif,
  Fraunces,
  Newsreader,
  Inter_Tight,
  Manrope,
  JetBrains_Mono,
} from 'next/font/google';
import TypeLabClient from './TypeLabClient';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
});
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});
const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
});

export default function Page() {
  const typefaces = [
    {
      id: 1,
      name: 'Instrument Serif',
      desc: 'Editorial cálido · Substack, Posthog',
      cls: instrumentSerif.className,
      weight: 400,
      tracking: '-0.02em',
    },
    {
      id: 2,
      name: 'Fraunces',
      desc: 'Humanista versátil · Mailchimp post-rebrand',
      cls: fraunces.className,
      weight: 400,
      tracking: '-0.025em',
    },
    {
      id: 3,
      name: 'Newsreader',
      desc: 'Sereno autoritario · feel NYT / Anthropic',
      cls: newsreader.className,
      weight: 400,
      tracking: '-0.02em',
    },
    {
      id: 4,
      name: 'Inter Tight',
      desc: 'Sans neutro tier-1 · Linear, Vercel',
      cls: interTight.className,
      weight: 500,
      tracking: '-0.04em',
    },
    {
      id: 5,
      name: 'Manrope',
      desc: 'Sans humanista cálido · vibe Notion',
      cls: manrope.className,
      weight: 500,
      tracking: '-0.035em',
    },
  ];

  return <TypeLabClient typefaces={typefaces} monoCls={jetbrainsMono.className} />;
}
