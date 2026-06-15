/**
 * AUDIT-COVERS — Lista los posts y sus portadas actuales para revisión.
 */
import 'dotenv/config';

const PID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9slaxsvf';
const DS = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const VER = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

const query = encodeURIComponent(
  '*[_type=="post"]{ _id, slug, title, "imgUrl": coverImage.asset->url, "imgFilename": coverImage.asset->originalFilename } | order(_createdAt asc)'
);

const url = `https://${PID}.api.sanity.io/v${VER}/data/query/${DS}?query=${query}`;
const res = await fetch(url);
const data = await res.json();

console.log('TOTAL POSTS:', data.result.length);
console.log();
for (const p of data.result) {
  console.log('---');
  console.log('TITLE:   ', p.title);
  console.log('SLUG:    ', p.slug?.current || p.slug);
  console.log('ID:      ', p._id);
  console.log('FILE:    ', p.imgFilename);
  console.log('URL:     ', p.imgUrl);
}
