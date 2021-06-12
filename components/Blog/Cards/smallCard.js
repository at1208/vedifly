import styles from '../../../styles/BlogSmallCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const readingTime = require('reading-time');
import moment from 'moment';


const Card = ({ blog }) => {

  return <Link href={`/${blog && blog.slug}`}>
           <div className={styles.outercontainer}>
              <div className="row">
                <div className="col-8">
                   <div className={styles.left}>
                     <div className="row">
                     <div className={styles.category}>

                     </div>
                     <div className="col authorCat">
                      <font className={styles.name}>{blog && blog.postedBy && blog.postedBy.full_name}</font>
                      <font className={styles.in}>in</font>
                      <font className={styles.categoryname}>{blog && blog.categories && blog.categories[0].name}</font>
                     </div>
                     </div>
                        <section className={styles.title}>{blog && blog.title}</section>
                     <small className={styles.time}>{moment(blog && blog.createdAt).format("MMM D")}  . {readingTime(blog && blog.body || " ").text}</small>
                   </div>
                </div>
                <div className="col-4">
                   <div className="float-right">
                        <LazyLoadImage src={blog && blog.featureImg}  alt="" className={styles.smallFeatureImage}/>
                   </div>
                </div>
              </div>
           </div>
         </Link>
}

export default Card;
