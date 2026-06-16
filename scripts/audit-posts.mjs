/**
 * AUDIT POSTS — Lista todos los posts con datos relevantes para re-edición.
 */
import 'dotenv/config';

const PID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DS = process.env.NEXT_PUBLIC_SANITY_DATASET;
const VER = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

const query = encodeURIComponent(
  `*[_type=="post" && site->domain=="swaraya.ai" && !(_id match "drafts.*")]{ 
    _id, 
    title, 
    "slug": slug.current, 
    excerpt, 
    publishedAt, 
    published,
    readingTime,
    "category": category->title,
    "categorySlug": category->slug.current,
    "categoryId": category->_id,
    "tags": tags[]->title
  } | order(publishedAt asc)`
);

const url = `https://${PID}.api.sanity.io/v${VER}/data/query/${DS}?query=${query}`;
const res = await fetch(url);
const data = await res.json();

console.log(`TOTAL POSTS (swaraya.ai): ${data.result.length}\n`);
for (const p of data.result) {
  console.log('─────────────────────────────────────────');
  console.log('  ID      :', p._id);
  console.log('  TITLE   :', p.title);
  console.log('  SLUG    :', p.slug);
  console.log('  PUB     :', p.publishedAt, '| published:', p.published);
  console.log('  CATEGORY:', p.category, `(${p.categorySlug})`);
  console.log('  TAGS    :', p.tags?.join(', '));
  console.log('  EXCERPT :', (p.excerpt || '').slice(0, 80) + '...');
}

// Categories
const catQuery = encodeURIComponent('*[_type=="category"]{ _id, title, "slug": slug.current, description }');
const catUrl = `https://${PID}.api.sanity.io/v${VER}/data/query/${DS}?query=${catQuery}`;
const catRes = await fetch(catUrl);
const catData = await catRes.json();
console.log('\n═════════════ CATEGORIES ═════════════');
for (const c of catData.result) {
  console.log(`- ${c.title} (${c.slug}) → ${c._id}`);
}
