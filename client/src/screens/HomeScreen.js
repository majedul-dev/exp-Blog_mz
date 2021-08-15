import React, { useEffect, useState, useRef } from "react";
import Loader from "../components/Loader";
import Axios from "axios";
import Posts from "../components/Posts";

const HomeScreen = () => {
  // const [searchStr, setSearchStr] = useState("");
  const container = useRef();

  console.log(container);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasEnded, setHasEnded] = useState(false); // to indicate whether or not we've fetched all the records
  const [loading, setLoading] = useState(true);

  // console.log(container.current.getBoundingClientRect());

  // useEffect(() => [container]);
  useEffect(() => {
    if (!hasEnded) {
      // eslint-disable-next-line
      fetch(page);
    }

    return () => {
      window.removeEventListener("scroll", trackScrolling, true);
    };
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", trackScrolling, true);
    // eslint-disable-next-line
  }, [posts]);

  // eslint-disable-next-line
  const trackScrolling = () => {
    if (
      // container.current.getBoundingClientRect().bottom &&
      container.current.getBoundingClientRect().bottom <= window.innerHeight
      // window.innerHeight + document.documentElement.scrollTop ===
      // document.documentElement.innerHeight
    ) {
      setPage(page + 1);
      window.removeEventListener("scroll", trackScrolling, true);
    }
  };

  const fetch = async () => {
    setLoading(true);

    const { data } = await Axios.get(
      `http://localhost:5000/api/posts?page=${page}`
    );

    if (data.length === 0) {
      setHasEnded(true);
    } else {
      setPosts([...posts, ...data]);
    }

    setLoading(false);
  };

  const renderPosts = () => {
    return posts.map((post, index) => {
      return (
        <Posts
          key={index}
          post={post}
          thumbnail={post.thumbnail.url}
          title={post.title}
          author={post.author}
          readTime={post.readTime}
          avatar={post.avatar}
          user={post.user}
          date={post.createdAt}
          body={post.body}
        />
      );
    });
  };

  if (!posts) return <div />;

  return (
    <>
      <h2 className="text-center mb-3" style={{ fontWeight: "500" }}>
        All Posts
      </h2>
      <div ref={container}>
        {renderPosts()}
        {loading && <Loader />}
        {hasEnded && (
          <div className="end-articles-msg pt-5">
            <p className="text-center text-primary">You're all caught up!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default HomeScreen;
