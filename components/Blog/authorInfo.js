import { useEffect, useState } from 'react';
import styles from '../../styles/Blog.module.css';

const AuthorInfo = ({ blog }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.onscroll = function() {myFunction()};
    var leftside = document.getElementById("lefttop");

    function myFunction() {
      if (window.pageYOffset > 200) {
        setShow(true)
        leftside.classList.add("fix-left-top");
      } else {
        leftside.classList.remove("fix-left-top");
        setShow(false)
      }
      if(window.pageYOffset > 2000){
        leftside.classList.remove("fix-left-top");
        setShow(false)
      }
    }
  })

if(show){
  return <div className={styles.leftside}>
            WRITTEN BY
            <div>
            <section className={styles.name}>{blog.postedBy.full_name}</section>
            <font className={styles.aboutauthor}></font>
            </div>
            <br />
            <hr />
         </div>
}else{
  return <>
         </>
 }
}

export default AuthorInfo;
