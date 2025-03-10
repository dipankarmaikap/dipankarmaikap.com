import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async (context) => {
  const blog = await getCollection("post");
  const siteUrl = context.site || "https://dipankarmaikap.com";

  const response = await rss({
    title: "Dipankar Maikap – Tech Blog",
    description:
      "Web development insights, JavaScript tips, and deep dives into modern frameworks like React, Node.js, and Astro.",
    site: siteUrl,
    items: blog
      .filter((p) => !p.data.draft)
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        author: "Dipankar Maikap",
        description: post.data.description,
        link: `${siteUrl}${post.id}/`,
      })),
  });
  return new Response(response.body, {
    status: response.status,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control":
        "public, s-maxage=3600, stale-while-revalidate=86400, max-age=0, must-revalidate",
    },
  });
};
