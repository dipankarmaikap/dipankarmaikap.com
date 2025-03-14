import type { APIRoute } from "astro";
import { experimental_AstroContainer } from "astro/container";
import { getEntry } from "astro:content";
import TemplateOne from "~/components/og/TemplateOne.astro";
import sharp from "sharp";

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
  const pngBuffer = await sharp(Buffer.from(result)).toFormat("png").toBuffer();

  return new Response(pngBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control":
        "public, max-age=31536000, immutable, s-maxage=31536000, stale-while-revalidate=86400",
    },
  });
};
