import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/backend/", "/profile/"],
    },
    sitemap: "https://mb-brandname.com/sitemap.xml",
  };
}
