const BlogSchema = (blog) => {
  return { "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${process.env.NEXT_PUBLIC_DOMAIN}/${blog.slug}`
  },
  "headline": blog.title,
  "image": `${process.env.NEXT_PUBLIC_API}/${blog.featureImg}`,
  "author": {
    "@type": "Person",
    "name": blog.postedBy.full_name
  },
  "publisher": {
    "@type": "Organization",
    "name": "Vedifly.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://vedifly.com/vedifly.png",
      "width": 60,
      "height": 60
    }
  },
  "datePublished": blog.createdAt,
  "dateModified": blog.updatedAt
  }
}

export default BlogSchema;
