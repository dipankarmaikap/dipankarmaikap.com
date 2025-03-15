import type { APIRoute } from "astro";
import { experimental_AstroContainer } from "astro/container";
import { getEntry } from "astro:content";
import TemplateOne from "~/components/og/TemplateOne.astro";
import { Resvg } from "@resvg/resvg-js";
import { getPosts } from "~/utils/getPosts";

const container = await experimental_AstroContainer.create();
export const prerender = true;

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;
  const post = await getEntry("post", slug || "hello-world");
  if (!post) {
    return Response.redirect("/404", 302);
  }
  const svg = await container.renderToString(TemplateOne, {
    props: {
      title: post?.data.title,
    },
  });
  const resvg = new Resvg(svg);
  const pngBuffer = resvg.render().asPng();
  return new Response(pngBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control":
        "public, max-age=31536000, immutable, s-maxage=31536000, stale-while-revalidate=86400",
    },
  });
};
export async function getStaticPaths() {
  const posts = await getPosts();
  return posts.map((post) => {
    return {
      params: { slug: post.id },
    };
  });
}
