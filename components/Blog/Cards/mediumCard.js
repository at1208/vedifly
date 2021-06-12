import styles from '../../../styles/BlogMediumCard.module.css';
import Image from 'next/image'
import Link from 'next/link';
const readingTime = require('reading-time');
import moment from 'moment';
import renderHTML from 'react-render-html';

import { LazyLoadImage } from 'react-lazy-load-image-component';

const Card = ({ blog }) => {
  if(blog){
    return <Link href={`/${blog.slug}`}>
             <div className={styles.outercontainer}>
               <div className="row col">
                 <div className="col-md-8 col-sm-8 col-8">
                     <div className="row">
                       <div className={styles.category}>

                       </div>
                       <div className="col pt-2 authorCat">
                        <font className={styles.name}>{blog.postedBy.full_name}</font>
                        <font className={styles.in}>in</font>
                        <font className={styles.categoryname}>{blog.categories[0].name}</font>
                       </div>
                     </div>
                     <div>
                        <section className={styles.title}>{blog.title}</section>
                        <div className="d-none d-sm-block">
                          <div className={styles.excerpt}>{renderHTML(blog.excerpt)}</div>
                        </div>
                     </div>
                     <small className={styles.time}>{moment(blog && blog.createdAt).format("MMM D")}  . {readingTime(blog.body || " ").text}</small>
                 </div>
                 <div className="col-md-4 col-sm-4 col-4">
                    <LazyLoadImage src={blog.featureImg}   alt=""  className={styles.featureImg} />
                 </div>
               </div>
             </div>
           </Link>
  }else {
    return <>
           </>
  }
}

export default Card;
