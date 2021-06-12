import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import BlogMediumCard from '../../components/Blog/Cards/mediumCard';
import { blogs_list_by_category } from '../../actions/blog';

const Category = ({ data }) => {

  if(data){
   function BlogsByCategory(){
     return data.map((blog, i) => {
       return <BlogMediumCard
               blog={blog}
               key={i} />
     })
   }
    return <>
            <Layout>
              <h1 className="text-center mb-5">Category name</h1>
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
      .then(response => {
         return { data: response }
      })
}

export default withRouter(Category);
