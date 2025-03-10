import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getPosts } from "~/utils/getPosts";

export const GET: APIRoute = async (context) => {
  const posts = await getPosts();
  const categories = await getCollection("category");

  const siteUrl = context.site || "https://dipankarmaikap.com";
  const staticPages = ["", "about", "contact"].map(
    (path) => `
    <url>
      <loc>${new URL(path, siteUrl).href}</loc>
      <changefreq>${path === "" ? "weekly" : "monthly"}</changefreq>
      <priority>${path === "" ? "1.0" : "0.8"}</priority>
    </url>`
  );
  const categoryurls = categories.map(
    (category) => `
    <url>
      <loc>${new URL("/category/" + category.id + "/", siteUrl).href}</loc>
      <lastmod>${new Date(category.data.pubDate).toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`
  );
  const urls = posts.map(
    (post) => `
    <url>
      <loc>${new URL(post.id + "/", siteUrl).href}</loc>
      <lastmod>${new Date(post.data.pubDate).toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages.join("")}
      ${urls.join("")}
      ${categoryurls.join("")}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control":
        "public, s-maxage=3600, stale-while-revalidate=86400, max-age=0, must-revalidate",
    },
  });
};
