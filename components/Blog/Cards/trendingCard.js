import styles from '../../../styles/TrendingCard.module.css';
import Image from 'next/image'
import Link from 'next/link';
const readingTime = require('reading-time');
import moment from 'moment';

const Card = ({ blog, count }) => {
  if(blog){
    return <Link href={`/${blog.slug}`}>
           <div className="col-md-4">
             <div className={styles.outercontainer}>
               <div className="row">
                <div className="col-2">
                  <span className={styles.count}>0{count+1}</span>
                </div>
                <div className="col-10">
                 <div className="row ">
                   <div className={styles.category}>

                   </div>
                   <div className="col pt-2">
                    <font className={styles.name}>{blog.postedBy.full_name}</font>
                    <font className={styles.in}>in</font>
                    <font className={styles.categoryname}>{blog.categories[0].name}</font>
                   </div>
                 </div>
                    <section className={styles.text}>{blog.title}</section>
                  <small className={styles.time}>{moment(blog.createdAt).format("MMM D")}  . {readingTime(blog.body || " ").text}</small>
                </div>
               </div>
             </div>
           </div>
          </Link>
  }else{
    return <>
           </>
  }
}

export default Card;
