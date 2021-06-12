import Head from 'next/head';
import BlogSchema from './blogSchema';

const BlogHead = ({ blog }) => (
        <Head>
            <title>
                {blog.title} | {process.env.NEXT_PUBLIC_APP_NAME}
            </title>
            <meta name="description" content={blog.mdesc} />
            <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/${blog.slug}`} />
            <meta property="og:title" content={`${blog.title}| ${process.env.NEXT_PUBLIC_APP_NAME}`} />
            <meta property="og:description" content={blog.mdesc} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${process.env.NEXT_PUBLIC_DOMAIN}/${blog.slug}`} />
            <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_APP_NAME}`} />
            <meta property="og:image" content={blog.featureImg} />
            <meta property="og:image:secure_url" content={blog.featureImg} />
            <meta property="og:image:type" content="image/jpg"  alt='author'/>
            <meta property="fb:app_id" content={`${process.env.NEXT_PUBLIC_FB_APP_ID}`} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@geeks_ocean" />
            <meta name="twitter:account_id" content="1244566301244190720" />
            <meta name="twitter:title" content={`${blog.title} | ${process.env.NEXT_PUBLIC_APP_NAME}`} />
            <meta name="twitter:description" content={blog.mdesc} />
            <meta name="twitter:creator" content={blog.postedBy.full_name} />
            <meta name="twitter:image" content={blog.featureImg} />
            <script
              type='application/ld+json'
              defer
              dangerouslySetInnerHTML={{ __html: JSON.stringify(BlogSchema(blog))}}
          />
        </Head>
);
export default BlogHead;
