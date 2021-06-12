import { useEffect, useState } from 'react';
import { related_blogs } from '../../actions/blog';
import dynamic from 'next/dynamic'
import styles from '../../styles/Blog.module.css';

const BlogSmallCard = dynamic(
  () => import('./Cards/smallCard'),
   { ssr: false }
)


const RelatedBlogs = ({ blog }) => {
  const [relatedBlogList, setRelatedBlogList] = useState();

  useEffect(() =>{
    related_blogs({ blog: blog })
      .then((value) => {
         setRelatedBlogList(value)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  function RelatedBlogListComponent(){
    if(relatedBlogList){
      return relatedBlogList.map((eachblog, i) => {
        return  <div className="col-md-4 col-sm-6" key={i}>
                  <div className={styles.eachblog}>
                     <BlogSmallCard key={i} blog={eachblog} />
                  </div>
                </div>
      })
    }else{
      return <>
             </>
    }
  }


  return <>
        <RelatedBlogListComponent />
         </>
}

export default RelatedBlogs;
