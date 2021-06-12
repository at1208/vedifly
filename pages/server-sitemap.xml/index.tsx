import { blogs_list_for_sitemap } from '../../actions/blog';
import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const urls = await blogs_list_for_sitemap();

  const fields = urls.map(eachblog => {
     return {
       loc: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${eachblog.slug}`,
       lastmod: eachblog.updatedAt,
       changefreq:'daily',
       priority:1
     }
  })


  return getServerSideSitemap(ctx, fields)
}

const Named = () => <div />;
export default Named;
