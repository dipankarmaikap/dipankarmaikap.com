---
title: "Fixing Next.js Build Error for Dynamic Routes with .html in URLs"
pubDate: "June 8, 2021"
updatedDate: "Feb 12 2025"
description: "Learn how to fix Next.js build errors when handling dynamic routes with .html in URLs, ensuring SEO-friendly migration from WordPress."
image: "cover-image.webp"
tags:
  [
    "Next.js",
    "WordPress Migration",
    "SEO",
    " Dynamic Routes",
    "Static Site Generation",
  ]
category: web-development
---

When migrating a large WordPress site (20K+ posts) to Next.js, maintaining the existing URL structure can be crucial for SEO. If your posts include `.html` at the end of their URLs, you might encounter build errors in Next.js. This guide explores how to resolve this issue effectively.

## A Simple Workaround: Next.js Rewrites

One quick fix is using Next.js `rewrites` to remove `.html` from URLs dynamically:

```javascript
module.exports = {
  async rewrites() {
    return [
      {
        source: "/:slug*.html", // Old URL with .html
        destination: "/:slug*", // Redirect without .html
      },
    ];
  },
};
```

Add this to `next.config.js` to handle requests, but note that this is a workaround, not a true fix.

## The Proper Fix: Handling `.html` in Dynamic Routes

By default, Next.js generates `.html` pages for static routes. To support `.html` in dynamic paths without errors, modify your dynamic post page like this:

### `pages/blog/[...slug].js`

```javascript
import Layout from "@components/Layout";
import getPostDetails from "@lib/wordpress/post/getPostDetails";
import getPostPaths from "@lib/wordpress/post/getPostPaths";
import BlogSection from "@components/pages/blog/BlogSection";

export default function BlogPage({ postDetails }) {
  return (
    <Layout>
      <BlogSection postDetails={postDetails} />
    </Layout>
  );
}

export async function getStaticProps({ params: { slug } }) {
  const postSlug = slug[slug.length - 1];
  const containHtml = postSlug.endsWith(".html");
  const querySlug = containHtml ? postSlug.slice(0, -5) : postSlug;
  const postDetails = await getPostDetails(querySlug);

  if (!postDetails) {
    return { notFound: true };
  }

  return {
    props: { postDetails, key: postSlug },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const postPaths = await getPostPaths();
  const paths = postPaths.map((post) => post.uri.slice(0, -5));
  return {
    paths,
    fallback: "blocking",
  };
}
```

### Explanation:

- **Handles `.html` URLs**: The script checks if `.html` exists in the slug and removes it before fetching data.
- **Ensures SEO-friendly URLs**: Keeps the existing `.html` structure without affecting the Next.js build process.
- **Supports Static Site Generation (SSG)**: Uses `getStaticProps` and `getStaticPaths` for performance optimization.

## Conclusion

This approach ensures a seamless migration while preserving the original WordPress URL structure. If you need further assistance, feel free to [reach out](/contact).
