import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link'
import { Box, Typography } from '@material-ui/core';
import styles from '../styles/Home.module.css';
import BlogLargeCard from '../components/Blog/Cards/largeCard';
import BlogSmallCard from '../components/Blog/Cards/smallCard';
import BlogMediumCard from '../components/Blog/Cards/mediumCard';
import AuthorCard from '../components/Blog/Cards/authorCard';
import TrendingCard from '../components/Blog/Cards/trendingCard';
import LargeCardSkeleton from '../components/Blog/Cards/largeCardSkeleton'
import SmallCardSkeleton from '../components/Blog/Cards/smallCardSkeleton'
import AuthorCardSkeleton from '../components/Blog/Cards/authorCardSkeleton'
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';

import Layout from '../components/Layout';
import { one_tap_login, authenticate, isAuth} from '../actions/auth';
import { blog_list, author_list, trending_list } from '../actions/blog';
import {random_categories } from '../actions/category';



const Home = ({ largeBlogs, smallBlogs, mediumBlogs }) => {
  const [authors, setAuthors] = useState();
  const [trendingBlogs, setTrending] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [categories, setCategories] = useState();



  useEffect(() => {
    window.onscroll = function() {myFunction()};
    var rightside = document.getElementById("rightbottom");
    // var sticky = rightside.offsetTop;
    function myFunction() {
      if (window.pageYOffset > 1000) {
        rightside.classList.add("fix-right-bottom");

      } else {
        rightside.classList.remove("fix-right-bottom");
      }
    }
  })


  useEffect(() => {
    author_list()
    .then(response => {
      setAuthors(response)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    trending_list()
    .then(response => {
      setTrending(response)
    })
    .catch(err => {
      console.log(err)
    })

    random_categories()
      .then(response => {
         setCategories(response)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  const handleOnetapResponse = (response) => {
  // const decodedToken = jwt_decode(response.credential)
    one_tap_login({ googleToken: response.credential, domain: process.env.NEXT_PUBLIC_DOMAIN_ID })
      .then(result => {
        authenticate(result, () => {
          setIsAuthenticated(true)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if(!isAuth()){
      window.onload = function () {
         google.accounts.id.initialize({
           client_id:process.env.NEXT_PUBLIC_GOOGLE_CLIEND_ID,
           callback: handleOnetapResponse
         });
         google.accounts.id.prompt();
       }
    }
  }, [])

  function HeaderSEO(){
     return <Head>
               <title>Home</title>
            </Head>
   }

  function SmallblogList(){
    if(smallBlogs){
      return smallBlogs.map((blog, i) => {
           return <BlogSmallCard blog={blog} key={i} />
      })
    }else{
        return <> </>
    }
  }

  function MediumblogList(){
    if(mediumBlogs){
      return mediumBlogs.map((blog, i) => {
           return <BlogMediumCard blog={blog} key={i} />
      })
    }else{
       return <> </>
    }
  }

  function AuthorList(){
    if(authors){
      return authors.map((author, i) => {
        return <AuthorCard author={author} key={i} />
      })
    }else{
      return <> </>
    }
  }

  function TrendingList(){
    if(trendingBlogs){
      return trendingBlogs.map((blog, i) => {
        return <TrendingCard blog={blog} key={i} count={i} />
      })
    }else{
      return <></>
    }
  }

  function ReadByCategories(){
    if(categories){
      return categories.map((item, i) => {
        return<Box p={0} key={i}>
                <Link href={`/category/${item.slug}`}>
                 <a>
                   <Typography variant="body1" className={styles.categoryName}>{item.name}</Typography>
                 </a>
                </Link>
                <br />
                <hr />
             </Box>


      })
    }
  }
  return <>
           <HeaderSEO  />
           <Layout isAuthenticated={isAuthenticated}>
              <div className="div-container mb-5">
                 <div className="row col">
                    <div className="col-md-4 col-sm-5 col-lg-4">
                     {largeBlogs?<BlogLargeCard blog={largeBlogs} />: <LargeCardSkeleton />}
                    </div>
                    <div className="col-md-8 col-sm-7 col-lg-4">
                     {smallBlogs?<SmallblogList />: <><SmallCardSkeleton /><SmallCardSkeleton /><SmallCardSkeleton /></>}
                    </div>

                    <div className="col-md-12 col-lg-4">
                      <div className={styles.rightside}>
                         <div className="row col">
                           <div className="col-md-6 col-sm-6 col-lg-12">
                           <div>
                               <font className={styles.title1}>LATEST FROM AUTHORS</font>
                               <br /> <br />
                               <div className="row col">
                                {authors?<AuthorList />:<div className="row col"><AuthorCardSkeleton />
                                <AuthorCardSkeleton />
                                <AuthorCardSkeleton />
                                <AuthorCardSkeleton />
                                <AuthorCardSkeleton />
                                <AuthorCardSkeleton />
                                <AuthorCardSkeleton />
                                <AuthorCardSkeleton /></div>}
                               </div>
                               <div className="pl-3" style={{ color: 'teal'}}>See more</div>
                           </div>
                           </div>
                           <div className="col-md-6 col-sm-6 col-lg-12">
                           <section className="mt-5">
                              <font className={styles.title1}>TOPICS TO READ</font>
                              <br />  <br />
                               {categories?ReadByCategories():<SmallCardSkeleton />}
                              <div className="pl-3" style={{ color: 'teal'}}>See more</div>
                           </section>
                           </div>
                         </div>
                      </div>
                    </div>
                 </div>
              </div>
              <hr />
              <div className="div-container mt-5">
                <section className={styles.title3}> TRENDING ON Vedifly</section>
                <div className="row col">
                   <TrendingList />
                </div>
              </div>
              <hr />
              <div className="mt-5 div-container">
                <div className="row">
                <div className="col-md-8">
                  <MediumblogList />
                </div>
                <div className="col-md-4 d-lg-block d-xl-block d-none d-md-block d-lg-none">
                  <section className="rightbottom" id="rightbottom">
                     <div className={styles.rightContainer}>
                       <div className={styles.rc}>
                         <span><WbIncandescentIcon className={styles.ideaIcon}/></span>
                         <label className={styles.exploreText}>Explore our IDEAS</label>
                       </div>
                       <div className="row col justify-content-center">
                         <div className="col-md-5 col-sm-5 col-lg-5 col-6 p-2">
                             <img src="/travlojournal.svg"

                               onClick={() => window.location = "http://travlojournal.com"}
                               className={styles.logo} />
                         </div>
                         <div className="col-md-5 col-sm-5 col-lg-5 col-6 p-2">
                             <img src="/fashiofly.svg"

                               onClick={() => window.location = "http://fashiofly.com"}
                               className={styles.logo} />
                         </div>
                         <div className="col-md-5 col-sm-5 col-lg-5 col-6 p-2">
                             <img src="/artoftalk.svg"

                               onClick={() => window.location = "http://artoftalk.in"}
                               className={styles.logo} />
                         </div>
                         <div className="col-md-5 col-sm-5 col-lg-5 col-6 p-2">
                             <img src="/elitegamezone.svg"

                               onClick={() => window.location = "http://elitegamezone.com"}
                               className={styles.logo} />
                         </div>

                         <div className="col-md-5 col-sm-5 col-lg-5 col-6 p-2">
                             <img src="/vedifly.svg"

                               onClick={() => window.location = "http://vedifly.com"}
                               className={styles.logo} />
                         </div>
                         <div className="col-md-5 col-sm-5 col-lg-5 col-6 p-2">
                             <img src="/scientifly.svg"

                               onClick={() => window.location = "http://scientifly.com"}
                               className={styles.logo} />
                         </div>
                         <div className="col-md-5 col-sm-5 col-lg-5 col-6 p-2">
                            <img src="/geeksocean.svg"

                              onClick={() => window.location = "http://geeksocean.com"}
                              className={styles.logo} />
                         </div>
                       </div>
                     </div>
                     <div className="row">
                       <span className={styles.field}>Help</span>
                       <span className={styles.field}>Careers</span>
                       <span className={styles.field}>Privacy</span>
                       <span className={styles.field}>Terms</span>
                       <span className={styles.field}>About</span>
                       <span className={styles.field}>Contact</span>
                       <span className={styles.field}>Sponsor</span>
                     </div>
                  </section>
                </div>
               </div>
              </div>
          </Layout>
         </>
}

Home.getInitialProps = async () => {
  try {
       let blog = await blog_list()
       let largeBlogs = blog && blog[0];
       let smallBlogs = blog && blog.slice(1, 5);
       let mediumBlogs = blog && blog.slice(5);
       return {
         largeBlogs,
         smallBlogs,
         mediumBlogs
       }
  } catch (e) {
    return {
      error: e
    }
  }
}
export default Home
