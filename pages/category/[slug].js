import Head from 'next/head';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import BlogMediumCard from '../../components/Blog/Cards/mediumCard';
import { blogs_list_by_category } from '../../actions/blog';
import { capitalize } from '../../utils/helpers';
import { category_by_slug } from '../../actions/category';

const Category = ({ data, router, category }) => {



  if(data && category && category.length){
   function BlogsByCategory(){
     return data.map((blog, i) => {
       return <BlogMediumCard
               blog={blog}
               key={i} />
     })
   }


   function HeaderSEO(){
     return <Head>
            <title>{capitalize(category[0].name)} | {process.env.NEXT_PUBLIC_APP_NAME}</title>
            <meta
                name="description"
                content="The content is specific towards the Individual being rather than materialistic entities, How to be a good person, How to attain a good conversation skil, etc"
            />
            <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}${router.asPath}`} />
            <meta property="og:title" content={`The content is specific towards the Individual being rather than materialistic entities | ${process.env.NEXT_PUBLIC_APP_NAME}`} />
            <meta
                property="og:description"
                content="The content is specific towards the Individual being rather than materialistic entities, How to be a good person, How to attain a good conversation skil, etc"
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${process.env.NEXT_PUBLIC_DOMAIN_URL}`} />
            <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_APP_NAME}`} />
            <meta property="og:image" content={`${process.env.NEXT_PUBLIC_DOMAIN}/artoftalk.svg`} />
            <meta property="og:image:secure_url" content={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/artoftalk.svg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${process.env.NEXT_PUBLIC_FB_APP_ID}`} />
            </Head>
   }


    return <>
            <Layout>
              <HeaderSEO />
              <h1 className="text-center mb-5">{capitalize(category[0].name)}</h1>
              <div className="row col container">
                <div className="col-md-3">
                </div>
                <div className="col-md-7">
                 <BlogsByCategory />
                </div>
                <div className="col-md-1">
                </div>
              </div>
            </Layout>
           </>
  }else{
    return <>
           </>
  }
}


Category.getInitialProps = ({ query }) => {
    return blogs_list_by_category(query.slug)
      .then(async (response) => {
          let category = await category_by_slug(query.slug);
          return { data: response, category }
      })
}

export default withRouter(Category);
