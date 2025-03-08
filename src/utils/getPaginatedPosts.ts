import { perPage } from "~/utils/variables";
import { type CollectionEntry } from "astro:content";

export function getPaginatedPosts(
  posts: CollectionEntry<"post">[],
  pageNo: number
): {
  paginatedPosts: CollectionEntry<"post">[];
  hasPrev: boolean;
  hasNext: boolean;
  totalPages: number;
} {
  const totalPages = Math.ceil(posts.length / perPage);
  const startIndex = (pageNo - 1) * perPage;
  const endIndex = startIndex + perPage;
  const filteredPosts = posts
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return {
    paginatedPosts: filteredPosts.slice(startIndex, endIndex),
    hasPrev: pageNo > 1,
    hasNext: pageNo < totalPages,
    totalPages,
  };
}
