import { getCollection } from "astro:content";

export async function getPosts() {
  const posts = await getCollection("post");
  return posts
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
