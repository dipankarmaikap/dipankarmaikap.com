---
title: "Headless WordPress and SEO"
pubDate: "July 20, 2022"
updatedDate: "Feb 12 2025"
description: "Learn how to optimize SEO in a headless WordPress setup using WPGraphQL and Next.js. Discover how to fetch Yoast SEO data and integrate it seamlessly into your frontend."
tags:
  [
    "Headless WordPress",
    "WordPress SEO",
    "Next.js SEO",
    "WPGraphQL",
    "Yoast SEO",
    "Headless CMS",
    "SEO Optimization",
    "Structured Data",
    "Open Graph Tags",
    "GraphQL API",
  ]

category: headless-cms
---

WordPress is a popular choice for website development, primarily due to its SEO capabilities and ease of content management. With plugins like Yoast SEO, users can optimize content on a per-page basis effortlessly. But what if you're using a headless WordPress setup with [Next.js](https://nextjs.org/)? In this article, we'll explore how to integrate Yoast SEO with [WPGraphQL](https://www.wpgraphql.com/) and ensure proper SEO optimization on your frontend.

## Using WordPress, Yoast, and WPGraphQL

For my project, I'm leveraging WordPress as the CMS, Yoast SEO for optimization, WPGraphQL for data fetching, and Next.js as the frontend framework. Thanks to the [**WPGraphQL for Yoast SEO**](https://github.com/ashhitch/wp-graphql-yoast-seo) plugin (huge shoutout to [Ash Hitchcock](https://x.com/ash_hitchcock)), we can access Yoast SEO data through WPGraphQL and utilize it in our frontend.

## Fetching SEO Data via GraphQL

If you're familiar with WPGraphQL, fetching SEO data is straightforward. For any page, post, or custom post type, the SEO field includes all metadata provided by Yoast:

```graphql
query PageQuery {
  page(id: "/", idType: URI) {
    title
    uri
    seo {
      title
      metaDesc
      canonical
      metaKeywords
      metaRobotsNofollow
      opengraphModifiedTime
      # Additional fields...
    }
  }
}
```

Now, you can use this data in your Next.js project to populate the `<head>` section for better SEO optimization.

## The Easiest Way to Get Full SEO Metadata

Instead of manually extracting individual fields, you can use `fullHead`, which returns the entire SEO metadata string, including structured data (`application/ld+json`):

```graphql
query PageQuery {
  page(id: "/", idType: URI) {
    title
    uri
    seo {
      title
      fullHead
    }
  }
}
```

## Addressing the WordPress URL Issue

One issue with using `fullHead` is that it references WordPress URLs instead of your frontend URLs. To resolve this, we need to replace WordPress URLs while preserving media URLs (e.g., Open Graph images).

### Solution: Replacing WordPress URLs

We'll create a function to transform the SEO string appropriately:

```javascript
let wpUrl = "https://yourwpsite.com";
let siteUrl = "https://frontendsite.com";

export default function seoStringParser(data) {
  data = data.replaceAll(wpUrl, siteUrl);
  data = data.replaceAll(`${siteUrl}/wp-content`, `${wpUrl}/wp-content`);
  return data;
}
```

### Explanation:

1. The first `replaceAll` swaps the WordPress URL with the frontend URL.
2. The second `replaceAll` restores media URLs (`/wp-content`) to ensure assets like Open Graph images remain unchanged.

## Integrating Yoast Data in a Next.js Site

Now that we have the corrected SEO string, we can add it to our Next.js project using the `<Head>` component:

```javascript
import Head from "next/head";
import parse from "html-react-parser";
import seoStringParser from "~/utils/seoStringParser";

export default function PageSEO({ seoData }) {
  let { title, fullHead } = seoData;
  return (
    <Head>
      <title>{title}</title>
      {parse(seoStringParser(fullHead))}
    </Head>
  );
}
```

### Key Benefits:

- **Fully automated SEO**: No need to manually add meta tags.
- **Preserves structured data**: Ensures rich results in Google Search.
- **Fixes URL discrepancies**: Corrects WordPress URLs to match your frontend.

## Final Thoughts

By leveraging WPGraphQL for Yoast SEO, you can maintain the powerful SEO capabilities of WordPress in a headless setup. Implementing `fullHead` with a URL transformation function ensures a seamless SEO experience on your frontend.

Have any questions? Feel free to reach out!
