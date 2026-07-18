---
title: "How to Add an RSS Feed to Your Next.js WordPress Site"
pubDate: "April 28, 2021"
updatedDate: "Feb 12 2025"
description: "Learn how to generate an RSS feed for your Next.js WordPress site using Server-Side Rendering (SSR). Improve content distribution and SEO with dynamic RSS feeds and caching for better performance."
tags:
  [
    "Next.js",
    "RSS Feed",
    "WordPress",
    "Server-Side Rendering",
    "XML Feed",
    "Web Development",
    "API Integration",
    "Blogging",
    "Content Syndication",
  ]
category: headless-cms
ogFilename: main.js
ogLanguage: js
ogCode: |-
  export async function generateRSS() {
    const posts = await getPosts();
    // Convert posts to RSS XML...
    return createRSS(posts);
  }
---

RSS feeds allow users to subscribe to website updates using feed readers, improving content distribution and engagement. They are especially useful for blogs, news sites, and content-heavy platforms.

This guide covers how to create a dynamic RSS feed using Next.js SSR (Server-Side Rendering) with caching to optimize performance.

## Objectives

The objective is to fetch the latest 20 posts from WordPress and generate an RSS feed using Next.js SSR. Implementing SSR caching helps reduce API calls, improving performance and efficiency.

## Why SSR for RSS Feeds?

Since static generation does not support XML pages, the best approach for generating RSS feeds is to use SSR. By leveraging SSR, the feed updates dynamically while allowing caching to reduce server load.

## Basic RSS Feed Example

```xml
<?xml version="1.0" ?>
<rss
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    version="2.0"
>
    <channel>
        <title>Site Name</title>
        <atom:link href="https://siteurl.com/feed.xml" rel="self" type="application/rss+xml" />
        <link>https://siteurl.com</link>
        <description>Site description</description>
        <language>en-US</language>
        <lastBuildDate>Latest post date</lastBuildDate>
        <item>
            <title><![CDATA[ Post Title ]]></title>
            <link>https://siteurl.com/post-url</link>
            <pubDate>Post Publish Date</pubDate>
            <guid isPermaLink="false">Unique post ID</guid>
            <description><![CDATA[ Post excerpt ]]></description>
            <content:encoded><![CDATA[ Post content ]]></content:encoded>
        </item>
    </channel>
</rss>
```

This is a standard RSS feed format. More details about RSS feeds can be found on [W3.org](https://validator.w3.org/feed/docs/rss2.html).

## Fetching RSS Feed Data from WordPress

```javascript utils/getFeedsPosts.js
async function getFeedsPosts() {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          posts(first: 20) {
            nodes {
              id
              uri
              title
              date
              excerpt
              content
            }
          }
        }`,
    }),
  });
  const { data } = await response.json();
  return data.posts.nodes;
}

export default getFeedsPosts;
```

This fetches the latest 20 posts from WordPress using the built-in `fetch` API instead of an external dependency.

## Converting Posts to RSS Feed Format

```javascript utils/postsToFeed.js
export default async function postsToFeed(blogPosts) {
  let latestPostDate = "";
  let rssItemsXml = "";

  blogPosts.forEach((post) => {
    const postDate = Date.parse(post.date);
    const postHref = process.env.NEXT_PUBLIC_BASE_URL + post.uri;
    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.date;
    }
    rssItemsXml += `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${postHref}</link>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <guid isPermaLink="false">${postHref}</guid>
          <description><![CDATA[${post.excerpt}]]></description>
          <content:encoded><![CDATA[${post.content}]]></content:encoded>
      </item>`;
  });

  return {
    rssItemsXml,
    latestPostDate,
  };
}
```

This function converts WordPress post data into an RSS feed format.

## Creating the `feed.xml` Page

```javascript pages/feed.xml.js
import getFeedsPosts from "@/lib/wordpress/getFeedsPosts";
import postsToFeed from "@/lib/wordpress/postsToFeed";

const FeedPage = () => null;

function Feeds(feed) {
  const { rssItemsXml, latestPostDate } = feed;
  return `<?xml version="1.0" ?>
        <rss
          xmlns:dc="http://purl.org/dc/elements/1.1/"
          xmlns:content="http://purl.org/rss/1.0/modules/content/"
          xmlns:atom="http://www.w3.org/2005/Atom"
          version="2.0"
        >
          <channel>
              <title>Site Name</title>
              <atom:link href="${
                process.env.NEXT_PUBLIC_BASE_URL
              }/feed.xml" rel="self" type="application/rss+xml" />
              <link>${process.env.NEXT_PUBLIC_BASE_URL}</link>
              <description>Site description</description>
              <language>en-US</language>
              <lastBuildDate>${new Date(
                latestPostDate,
              ).toUTCString()}</lastBuildDate>
              ${rssItemsXml}
          </channel>
        </rss>`;
}

export async function getServerSideProps({ res }) {
  const posts = await getFeedsPosts();
  const feed = await postsToFeed(posts);
  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");
  res.write(Feeds(feed));
  res.end();
  return { props: {} };
}

export default FeedPage;
```

Now, access the RSS feed at `http://localhost:3000/feed.xml`.

## Important Notes

- Use `.toUTCString()` for date formatting, as RSS feeds follow the RFC 822 date-time format.
- Caching with `s-maxage=600, stale-while-revalidate` reduces API calls while keeping content updated.

This approach ensures a well-structured, optimized RSS feed for a Next.js WordPress site.
