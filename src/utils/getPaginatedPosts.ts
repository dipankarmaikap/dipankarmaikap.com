import { perPage } from "~/utils/variables";
import { type CollectionEntry } from "astro:content";
import { getPosts } from "~/utils/getPosts";

export async function getPaginatedPosts(pageNo: number): Promise<{
  paginatedPosts: CollectionEntry<"post">[];
  hasPrev: boolean;
  hasNext: boolean;
  totalPages: number;
}> {
  const posts = await getPosts();
  const totalPages = Math.ceil(posts.length / perPage);
  const startIndex = (pageNo - 1) * perPage;
  const endIndex = startIndex + perPage;
  return {
    paginatedPosts: posts.slice(startIndex, endIndex),
    hasPrev: pageNo > 1,
    hasNext: pageNo < totalPages,
    totalPages,
  };
}
