import type { APIRoute } from "astro";
import { experimental_AstroContainer } from "astro/container";
import { getEntry } from "astro:content";
import TemplateOne from "~/components/og/TemplateOne.astro";
const container = await experimental_AstroContainer.create();

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;
  const post = await getEntry("post", slug || "hello-world");
  if (!post) {
    return Response.redirect("/404", 302);
  }
  const result = await container.renderToString(TemplateOne, {
    props: {
      title: post?.data.title,
    },
  });

  return new Response(result, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
