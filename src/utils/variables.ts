export const perPage = 10;
export const fburl = "https://www.facebook.com/dipankarmaikap77";
export const siteUrl = "https://dipankarmaikap.com";
export const authorName = "Dipankar Maikap";
export const mySchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: authorName,
  url: siteUrl,
  description:
    "Web developer and tech blogger specializing in JavaScript, React, and web performance optimization.",
  image: "https://dipankarmaikap.com/profile.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kolkata",
    addressRegion: "WB",
    postalCode: "721425",
    addressCountry: "India",
  },
  sameAs: [
    "https://github.com/dipankarmaikap",
    "https://x.com/dipankarmaikap",
    "https://www.linkedin.com/in/dipankarmaikap/",
    "https://stackoverflow.com/users/14425902/dipankar-maikap",
  ],
  jobTitle: "Developer Relations Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Storyblok",
    url: "https://www.storyblok.com/",
  },
  knowsAbout: [
    "JavaScript",
    "React",
    "Web Performance",
    "Frontend Development",
    "SEO",
    "Astro",
    "Node.js",
  ],
};

const { "@context": _, ...author } = mySchema;

export const publisher = {
  ...author,
  logo: {
    "@type": "ImageObject",
    url: "https://dipankarmaikap.com/logo.png",
    width: 600,
    height: 60,
  },
};

export { author };
