import styles from '../../../styles/BlogLargeCard.module.css';
import Image from 'next/image'
import Link from 'next/link';
const readingTime = require('reading-time');
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Card = ({ blog }) => {
  if(blog){
    return <Link href={`/${blog && blog.slug}`}>
             <div className={styles.outercontainer}>
                 <a>
                    <LazyLoadImage effect="blur" src={blog && blog.featureImg} width="100%" height="100%" alt="" className="img img-fluid"/>
                 </a>
                <div className="row pt-3 pr-2 pb-2">
                  <div className={styles.category}>

                  </div>
                  <div className="col pt-1 authorCat">
                   <font className={styles.name}>{blog.postedBy.full_name}</font>
                   <font className={styles.in}>in</font>
                   <font className={styles.categoryname}>{blog.categories[0].name}</font>
                  </div>
                </div>

                  <a>
                  <section className={styles.title}>{blog.title}</section>
                <section className={styles.subheading}>Read Top Stories With Author {blog.postedBy.full_name}</section>
                  </a>
                <small className={styles.time}>{moment(blog.createdAt).format("MMM D")}  . {readingTime(blog.body || " ").text}</small>
                <br /><br />
             </div>
           </Link>
  }else{
    return <>
           </>
  }
}

export default Card;
