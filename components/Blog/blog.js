import styles from '../../styles/Blog.module.css';
import dynamic from 'next/dynamic'
import renderHTML from 'react-render-html';
import Link from 'next/link';
import moment from 'moment';
const readingTime = require('reading-time');
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Avatar = dynamic(
  () => import('@material-ui/core/Avatar'),
   { ssr: false }
)

const Blog = ({ blog }) => {
  if(blog){
    const showAuthor = () => {
      return <section className={styles.usercontainer}>
               <div className="row">
                  <div className="col-8 row">
                    <Avatar  variant="circular" src={blog.postedBy.headshot_url} alt="" className={styles.authorimg}/>
                    <div className={styles.authorContainer}>
                      <font className={styles.authorname}>{blog.postedBy.full_name}</font>
                      <font className={styles.postedtime}>{moment(blog && blog.createdAt).format("MMM D")}  . {readingTime(blog && blog.body || " ").text}</font>
                    </div>
                  </div>
                  <div className="col-4">
                  </div>
               </div>
            </section>
    }


    const showCategories = () => {
    let categories  = blog.categories.map((category, i) => {
      return <Link href={`/category/${category.slug}`} key={i}>
                <a>
                  <span className={styles.tagcatbtn}>{category.name}</span>
                </a>
             </Link>
    })
     return  <div className={styles.extras}>
                {categories}
             </div>
    }

    return <>
              <h1 className={styles.title}>
               {blog.title}
              </h1>
                {showAuthor()}
              <div >
                <LazyLoadImage src={blog.featureImg} className="img img-fluid mt-5" width="100%" height="100%" alt="feature image" />
              </div>
               <div className={styles.body}>{renderHTML(blog.body || " ")}</div>
               <div className="row justify-content-center">
                {showCategories()}
               </div>
           </>
  }else{
    return <>
          </>
  }
}

export default Blog;
