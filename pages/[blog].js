import { useState } from "react";
import { withRouter } from "next/router";
import dynamic from "next/dynamic";
import Router from "next/router";
import BlogDetail from "../components/Blog/blog";
import BlogHead from "../components/Blog/blogHead";
import Layout from "../components/Layout";
import styles from "../styles/Blog.module.css";
import { read_blog } from "../actions/blog";

const RelatedBlogs = dynamic(() => import("../components/Blog/relatedBlogs"), {
  ssr: false,
});

const AuthorInfo = dynamic(() => import("../components/Blog/authorInfo"), {
  ssr: false,
});

const GoogleOneTap = dynamic(() => import("../components/Blog/googleOneTap"), {
  ssr: false,
});

const Blog = ({ query, blog }) => {
  if (blog) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
      <>
        <GoogleOneTap
          setIsAuthenticated={(status) => setIsAuthenticated(status)}
        />
        <BlogHead blog={blog} />
        <Layout isAuthenticated={isAuthenticated}>
          <div className="row col justify-content-center">
            <div className="col-md-3  col-lg-3 d-lg-block d-xl-block d-none d-md-block d-lg-none">
              <div className="lefttop" id="lefttop">
                <AuthorInfo blog={blog} />
              </div>
            </div>
            <div className="col-md-7 col-sm-12 col-lg-6">
              <BlogDetail blog={blog} />
            </div>
            <div className="col-md-2  col-lg-3"></div>
          </div>
          <br />
          <br />
          <div className={styles.morecontainer}>
            <h5 className={styles.moretitle}>More from Vedifly</h5>
            <br />
            <hr />
            <div className="row col">
              <RelatedBlogs blog={blog} />
            </div>
          </div>
        </Layout>
      </>
    );
  } else {
    return <></>;
  }
};

Blog.getInitialProps = ({ query }) => {
  return read_blog(query.blog).then((response) => {
    return { blog: response, query };
  });
};

export default withRouter(Blog);
