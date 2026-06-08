// Sanity configuration. The dataset is public-read, so no token is required
// for fetching published content. To avoid CORS restrictions when running in
// the browser (Sanity's CDN/API rejects unknown origins), we route browser
// requests through a same-origin Next.js proxy at /api/sanity/query. On the
// server, we hit Sanity's CDN directly for best performance.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9slaxsvf';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

function buildDirectUrl(query, params) {
  const url = new URL(
    `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`,
  );
  url.searchParams.set('query', query);
  if (params && typeof params === 'object') {
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(`$${k}`, JSON.stringify(v));
    }
  }
  return url.toString();
}

async function sanityFetch(query, params = {}) {
  const isBrowser = typeof window !== 'undefined';
  let url;
  if (isBrowser) {
    url = `/api/sanity/query?query=${encodeURIComponent(query)}&params=${encodeURIComponent(
      JSON.stringify(params || {}),
    )}`;
  } else {
    url = buildDirectUrl(query, params);
  }
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Sanity request failed (${res.status}): ${text.slice(0, 200)}`);
  }
  const data = await res.json();
  return data?.result;
}

export const sanityClient = {
  fetch: sanityFetch,
  config: () => ({ projectId, dataset, apiVersion, useCdn: true }),
};

// ---- Portable Text -> HTML (mirrors backend portable_text_to_html) ----
function escapeAttr(value) {
  return String(value || '').replace(/"/g, '&quot;');
}

export function portableTextToHtml(blocks) {
  if (!blocks || !Array.isArray(blocks)) return '';

  const htmlParts = [];

  for (const block of blocks) {
    if (!block || typeof block !== 'object') continue;

    const blockType = block._type;

    if (blockType === 'block') {
      const style = block.style || 'normal';
      const children = block.children || [];
      let text = '';

      for (const child of children) {
        let childText = child.text || '';
        const marks = child.marks || [];
        for (const mark of marks) {
          if (mark === 'strong') childText = `<strong>${childText}</strong>`;
          else if (mark === 'em') childText = `<em>${childText}</em>`;
          else if (mark === 'code') childText = `<code>${childText}</code>`;
        }
        text += childText;
      }

      // Video marker [VIDEO:videoId:Title]
      if (text.startsWith('[VIDEO:') && text.endsWith(']')) {
        const videoData = text.slice(7, -1);
        const sepIdx = videoData.indexOf(':');
        if (sepIdx !== -1) {
          const videoId = videoData.slice(0, sepIdx);
          const videoTitle = videoData.slice(sepIdx + 1);
          htmlParts.push(
            `<div class="video-embed" data-video-id="${escapeAttr(videoId)}" data-video-title="${escapeAttr(videoTitle)}">[VIDEO:${videoId}:${videoTitle}]</div>`
          );
        }
        continue;
      }

      if (style === 'h1') htmlParts.push(`<h1>${text}</h1>`);
      else if (style === 'h2') htmlParts.push(`<h2>${text}</h2>`);
      else if (style === 'h3') htmlParts.push(`<h3>${text}</h3>`);
      else if (style === 'blockquote') htmlParts.push(`<blockquote>${text}</blockquote>`);
      else if (text) htmlParts.push(`<p>${text}</p>`);
    } else if (blockType === 'image') {
      const url = block.url || '';
      if (url) {
        htmlParts.push(`<img src="${escapeAttr(url)}" alt="" class="w-full rounded-lg my-6" />`);
      }
    }
  }

  return htmlParts.join('\n');
}

// ---- Blog data fetchers (mirror backend routes/blog_sanity.py) ----

export async function getPosts({ page = 1, perPage = 10, category, tag, search, site } = {}) {
  const filters = ['_type == "post"', 'published == true', '!(_id match "drafts.*")'];
  const params = {};

  if (site) {
    filters.push('site->domain == $site');
    params.site = site;
  }
  if (category) {
    filters.push('category->title == $category');
    params.category = category;
  }
  if (tag) {
    filters.push('$tag in tags[]->title');
    params.tag = tag;
  }
  if (search) {
    filters.push('(title match $search || excerpt match $search)');
    params.search = `*${search}*`;
  }

  const filterString = filters.join(' && ');
  const query = `*[${filterString}] | order(publishedAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    "coverImage": coverImage.asset->url,
    publishedAt,
    readingTime,
    "category": category->title,
    "tags": tags[]->title,
    "site": site->{ name, domain }
  }`;

  const allPosts = (await sanityClient.fetch(query, params)) || [];
  const total = allPosts.length;
  const totalPages = total > 0 ? Math.ceil(total / perPage) : 1;
  const start = (page - 1) * perPage;
  const posts = allPosts.slice(start, start + perPage);

  return { posts, total, page, per_page: perPage, total_pages: totalPages };
}

export async function getPost(slug, site) {
  const params = { slug };
  let siteFilter = '';
  if (site) {
    siteFilter = ' && site->domain == $site';
    params.site = site;
  }

  const query = `*[_type == "post" && slug.current == $slug && published == true${siteFilter}][0] {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    "coverImage": coverImage.asset->url,
    publishedAt,
    readingTime,
    "category": category->title,
    "tags": tags[]->title,
    "site": site->{ name, domain },
    body[]{
      ...,
      _type == "image" => { "url": asset->url }
    }
  }`;

  const post = await sanityClient.fetch(query, params);
  if (!post) return null;

  post.content = post.body ? portableTextToHtml(post.body) : '';
  return post;
}

export async function getCategories(site) {
  const params = {};
  let siteFilter = '';
  if (site) {
    siteFilter = ' && (site->domain == $site || !defined(site))';
    params.site = site;
  }

  const query = `*[_type == "category"${siteFilter}] {
    title,
    "site": site->domain,
    "count": count(*[_type == "post" && published == true && references(^._id)])
  }`;

  const categories = (await sanityClient.fetch(query, params)) || [];
  return categories.map((cat) => ({ name: cat.title, count: cat.count || 0, site: cat.site }));
}

export async function getTags(site) {
  const params = {};
  let siteFilter = '';
  if (site) {
    siteFilter = ' && site->domain == $site';
    params.site = site;
  }

  const query = `*[_type == "tag"${siteFilter}] {
    title,
    "count": count(*[_type == "post" && published == true && references(^._id)])
  } | order(count desc)`;

  const tags = (await sanityClient.fetch(query, params)) || [];
  return tags.map((tag) => ({ name: tag.title, count: tag.count || 0 }));
}

export async function getRecentPosts(limit = 3, site) {
  const params = {};
  let siteFilter = '';
  if (site) {
    siteFilter = ' && site->domain == $site';
    params.site = site;
  }

  const query = `*[_type == "post" && published == true && !(_id match "drafts.*")${siteFilter}] | order(publishedAt desc)[0...${limit}] {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    "coverImage": coverImage.asset->url,
    publishedAt,
    readingTime,
    "category": category->title,
    "tags": tags[]->title,
    "site": site->{ name, domain }
  }`;

  return (await sanityClient.fetch(query, params)) || [];
}
