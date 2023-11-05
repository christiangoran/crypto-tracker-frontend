import React, { useEffect, useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";

const ShowPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [errors, setErrors] = useState([]);
  const { currencyId } = props;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosRes.get(
          `/currencyposts/?currency=${currencyId}`
        );
        console.log(data.results);
        const matchingPosts = data.results.filter(
          (post) => post.currency === Number(currencyId)
        );
        console.log(matchingPosts);
        setPosts(matchingPosts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [currencyId]);

  return (
    <div>
      {posts.map((post, index) => {
        return (
          <div key={index}>
            <p>{post.topic}</p>
            <p>{post.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ShowPosts;
