import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Box, Typography } from "@material-ui/core";
import styles from "../styles/Home.module.css";
import Skeleton from "react-loading-skeleton";
import BlogLargeCard from "../components/Blog/Cards/largeCard";
import BlogSmallCard from "../components/Blog/Cards/smallCard";
import BlogMediumCard from "../components/Blog/Cards/mediumCard";
import AuthorCard from "../components/Blog/Cards/authorCard";
import TrendingCard from "../components/Blog/Cards/trendingCard";
import LargeCardSkeleton from "../components/Blog/Cards/largeCardSkeleton";
import SmallCardSkeleton from "../components/Blog/Cards/smallCardSkeleton";
import AuthorCardSkeleton from "../components/Blog/Cards/authorCardSkeleton";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import InfiniteScroll from "react-infinite-scroll-component";

import Layout from "../components/Layout";
import { blog_list, author_list, trending_list } from "../actions/blog";
import { random_categories } from "../actions/category";

const Home = ({
  largeBlogs,
  smallBlogs,
  mediumBlogs,
  blogsLimit,
  blogSkip,
  totalBlogs,
}) => {
  const [authors, setAuthors] = useState();
  const [trendingBlogs, setTrending] = useState();
  const [categories, setCategories] = useState();
  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [stopLoading, setStopLoading] = useState(false);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  useEffect(() => {
    window.onscroll = function () {
      myFunction();
    };
    var rightside = document.getElementById("rightbottom");
    // var sticky = rightside.offsetTop;
    function myFunction() {
      if (window.pageYOffset > 1000) {
        rightside.classList.add("fix-right-bottom");
      } else {
        rightside.classList.remove("fix-right-bottom");
      }
    }
  });

  useEffect(() => {
    author_list()
      .then((response) => {
        setAuthors(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    trending_list()
      .then((response) => {
        setTrending(response);
      })
      .catch((err) => {
        console.log(err);
      });

    random_categories()
      .then((response) => {
        setCategories(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function loadMore() {
    try {
      let toSkip = skip + limit;
      let data = await blog_list({ skip: toSkip, limit });
      if (data.length === 0) return setStopLoading(true);
      setLoadedBlogs([...loadedBlogs, ...data]);
      setSize(data.length);
      setSkip(toSkip);
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  function HeaderSEO() {
    return (
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta
          name="description"
          content="This site is a knowledge website based on our ancient medicinal knowledge to cure various diseases. All the medicinal herbs and their uses in different diseases. Herbs can be searched by diseases name and vice versa."
        />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}`} />
        <meta
          property="og:title"
          content={`This site is a knowledge website based on our ancient medicinal knowledge to cure various diseases. All the medicinal herbs and their uses in different diseases. Herbs can be searched by diseases name and vice versa. | ${process.env.NEXT_PUBLIC_APP_NAME}`}
        />
        <meta
          property="og:description"
          content="This site is a knowledge website based on our ancient medicinal knowledge to cure various diseases. All the medicinal herbs and their uses in different diseases. Herbs can be searched by diseases name and vice versa."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN_URL}`}
        />
        <meta
          property="og:site_name"
          content={`${process.env.NEXT_PUBLIC_APP_NAME}`}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/vedifly.svg`}
        />
        <meta
          property="og:image:secure_url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/vedifly.svg`}
        />
        <meta property="og:image:type" content="image/jpg" />
        <meta
          property="fb:app_id"
          content={`${process.env.NEXT_PUBLIC_FB_APP_ID}`}
        />
      </Head>
    );
  }

  function SmallblogList() {
    if (smallBlogs) {
      return smallBlogs.map((blog, i) => {
        return <BlogSmallCard blog={blog} key={i} />;
      });
    } else {
      return <> </>;
    }
  }

  function MediumblogList() {
    if (mediumBlogs) {
      return mediumBlogs.map((blog, i) => {
        return <BlogMediumCard blog={blog} key={i} />;
      });
    } else {
      return <> </>;
    }
  }

  function AuthorList() {
    if (authors) {
      return authors.map((author, i) => {
        return <AuthorCard author={author} key={i} />;
      });
    } else {
      return <> </>;
    }
  }

  function TrendingList() {
    if (trendingBlogs) {
      return trendingBlogs.map((blog, i) => {
        return <TrendingCard blog={blog} key={i} count={i} />;
      });
    } else {
      return <></>;
    }
  }

  function ReadByCategories() {
    if (categories) {
      return categories.map((item, i) => {
        return (
          <Box p={0} key={i}>
            <Link href={`/category/${item.slug}`}>
              <a>
                <Typography variant="body1" className={styles.categoryName}>
                  {item.name}
                </Typography>
              </a>
            </Link>
            <br />
            <hr />
          </Box>
        );
      });
    }
  }

  function ShowMoreBlogs() {
    if (loadedBlogs) {
      return loadedBlogs.map((blog, i) => {
        return <BlogMediumCard blog={blog} key={i} />;
      });
    } else {
      return <> </>;
    }
  }
  return (
    <>
      <HeaderSEO />
      <Layout>
        <div className="div-container mb-5">
          <div className="row col">
            <div className="col-md-4 col-sm-5 col-lg-4">
              {largeBlogs ? (
                <BlogLargeCard blog={largeBlogs} />
              ) : (
                <LargeCardSkeleton />
              )}
            </div>
            <div className="col-md-8 col-sm-7 col-lg-4">
              {smallBlogs ? (
                <SmallblogList />
              ) : (
                <>
                  <SmallCardSkeleton />
                  <SmallCardSkeleton />
                  <SmallCardSkeleton />
                </>
              )}
            </div>

            <div className="col-md-12 col-lg-4">
              <div className={styles.rightside}>
                <div className="row col">
                  <div className="col-md-6 col-sm-6 col-lg-12">
                    <div>
                      <font className={styles.title1}>LATEST FROM AUTHORS</font>
                      <br /> <br />
                      <div className="row col">
                        {authors ? (
                          <AuthorList />
                        ) : (
                          <div className="row col">
                            <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                              <AuthorCardSkeleton />
                            </div>

                            <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                              <AuthorCardSkeleton />
                            </div>
                            <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                              <AuthorCardSkeleton />
                            </div>
                            <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                              <AuthorCardSkeleton />
                            </div>
                            <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                              <AuthorCardSkeleton />
                            </div>
                            <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                              <AuthorCardSkeleton />
                            </div>
                            <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                              <AuthorCardSkeleton />
                            </div>
                            <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                              <AuthorCardSkeleton />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="pl-3" style={{ color: "teal" }}>
                        See more
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-lg-12">
                    <section className="mt-5">
                      <font className={styles.title1}>TOPICS TO READ</font>
                      <br /> <br />
                      {categories ? (
                        ReadByCategories()
                      ) : (
                        <>
                          <SmallCardSkeleton />
                          <SmallCardSkeleton />
                          <SmallCardSkeleton />
                        </>
                      )}
                      <div className="pl-3" style={{ color: "teal" }}>
                        <Link href="/categories">
                          <a>
                            <span style={{ color: "teal" }}>See more</span>
                          </a>
                        </Link>
                      </div>
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
              {
                <InfiniteScroll
                  dataLength={loadedBlogs.length}
                  next={loadMore}
                  hasMore={true}
                  style={{ overflow: "hidden !important" }}
                  loader={
                    !stopLoading && (
                      <div style={{ margin: "10px 0px 70px 0px" }}>
                        <div className="row col">
                          <div className="col-8">
                            <Box>
                              <Skeleton count={4} width={"90%"} />
                            </Box>
                          </div>
                          <div className="col-4">
                            <Skeleton width={"80%"} height={"100%"} />
                          </div>
                        </div>
                      </div>
                    )
                  }
                >
                  {<ShowMoreBlogs />}
                </InfiniteScroll>
              }
            </div>
            <div className="col-md-4 d-lg-block d-xl-block d-none d-md-block d-lg-none">
              <section className="rightbottom" id="rightbottom">
                <div className={styles.rightContainer}>
                  <div className={styles.rc}>
                    <span>
                      <WbIncandescentIcon className={styles.ideaIcon} />
                    </span>
                    <label className={styles.exploreText}>
                      Explore our IDEAS
                    </label>
                  </div>
                  <div className="row col justify-content-center">
                    <div className="col-md-5 col-sm-5 col-lg-5 col-6 p-2">
                      <a
                        href="http://travlojournal.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src="/travlojournal.svg" className={styles.logo} />
                      </a>
                    </div>
                    {/*<div className="col-md-5 col-sm-5 col-lg-5 col-6 p-2">
                  <img
                    src="/fashiofly.svg"
                    onClick={() =>
                      (window.location = "http://fashiofly.com")
                    }
                    className={styles.logo}
                  />
                </div>*/}
                    <div className="col-md-5 col-sm-5 col-lg-5 col-6 p-2">
                      <a
                        href="http://artoftalk.in"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src="/artoftalk.svg" className={styles.logo} />
                      </a>
                    </div>
                    <div className="col-md-5 col-sm-5 col-lg-5 col-6 p-2">
                      <a
                        href="http://elitegamezone.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src="/elitegamezone.svg" className={styles.logo} />
                      </a>
                    </div>

                    <div className="col-md-5 col-sm-5 col-lg-5 col-6 p-2">
                      <a
                        href="http://vedifly.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src="/vedifly.svg" className={styles.logo} />
                      </a>
                    </div>
                    {/*<div className="col-md-5 col-sm-5 col-lg-5 col-6 p-2">
                  <img
                    src="/scientifly.svg"
                    onClick={() =>
                      (window.location = "http://scientifly.com")
                    }
                    className={styles.logo}
                  />
                </div>*/}
                    <div className="col-md-5 col-sm-5 col-lg-5 col-6 p-2">
                      <a
                        href="http://geeksocean.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src="/geeksocean.svg" className={styles.logo} />
                      </a>
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
  );
};

Home.getInitialProps = async () => {
  try {
    let skip = 0;
    let limit = 10;
    let blog = await blog_list();
    let largeBlogs = blog && blog[0];
    let smallBlogs = blog && blog.slice(1, 5);
    let mediumBlogs = blog && blog.slice(5);
    return {
      largeBlogs,
      smallBlogs,
      mediumBlogs,
      blogsLimit: limit,
      blogSkip: skip,
      totalBlogs: blog.length,
    };
  } catch (e) {
    return {
      error: e,
    };
  }
};
export default Home;
