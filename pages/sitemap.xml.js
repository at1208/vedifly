import React from "react";
import { blogs_list_for_sitemap } from "../actions/blog";

const createSitemap = (posts) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${posts
          .map((blog, i) => {
            return `
                    <url>
                        <loc>${`${process.env.NEXT_PUBLIC_DOMAIN_URL}/${blog.slug}`}</loc>
                        <changefreq>${"daily"}</changefreq>
                        <priority>${1}</priority>
                        <lastmod>${blog.updatedAt}</lastmod>
                    </url>
                `;
          })
          .join("")}
    </urlset>
    `;

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    const posts = await blogs_list_for_sitemap();

    res.setHeader("Content-Type", "text/xml");
    res.write(createSitemap(posts));
    res.end();
  }
}

export default Sitemap;
