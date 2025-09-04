import type { APIRoute } from "astro";
import { experimental_AstroContainer } from "astro/container";
import TemplateOne from "~/components/og/TemplateOne.astro";
import { Resvg } from "@resvg/resvg-js";
import { getPosts } from "~/utils/getPosts";
import { siteUrl } from "~/utils/variables";
import { imageUrlToBase64 } from "~/utils/imageUrlToBase64";

const container = await experimental_AstroContainer.create();
export const prerender = true;
const userAvatar = siteUrl + "images/dipankar-maikap.jpg";

export const GET: APIRoute = async ({ props }) => {
  const avatarBase64 = await imageUrlToBase64(userAvatar);

  const html = await container.renderToString(TemplateOne, {
    props: {
      title: props.post.data.title,
      avatar: avatarBase64,
    },
  });
  const resvg = new Resvg(html);
  const pngBuffer = resvg.render().asPng();
  return new Response(new Uint8Array(pngBuffer), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control":
        "public, max-age=31536000, immutable, s-maxage=31536000, stale-while-revalidate=86400",
    },
  });
};
export async function getStaticPaths() {
  const posts = await getPosts();
  return posts
    .filter((post) => !post.data.image)
    .map((post) => {
      return {
        params: { slug: post.id },
        props: { post },
      };
    });
}
