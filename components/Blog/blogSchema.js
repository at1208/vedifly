const BlogSchema = (blog) => {
  return { "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${process.env.NEXT_PUBLIC_DOMAIN}/blogs/${"query.slug"}`
  },
  "headline": "blog.title",
  "image": `${process.env.NEXT_PUBLIC_API}/blog/photo/${"blog.slug"}`,
  "author": {
    "@type": "Person",
    "name": "blog.postedBy.name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Geeksocean.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://geeksocean.com/static/images/Logo.jpg",
      "width": 60,
      "height": 60
    }
  },
  "datePublished": "blog.createdAt",
  "dateModified": "blog.updatedAt"
  }
}

export default BlogSchema;
