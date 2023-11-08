import React, { useEffect, useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";
import { Col, Row } from "react-bootstrap";
import styles from "../../styles/ShowPosts.module.css";
import Avatar from "../../components/Avatar";
import { PostDropdown } from "../../components/PostDropdown";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { useNavigate } from "react-router-dom";

const ShowPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currencyId } = props;
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

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
        console.log("this is the matching posts", matchingPosts);
        setPosts(matchingPosts);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currencyId, props.updatePostTrigger]);

  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  const handleEdit = (id) => {
    navigate(`/currencyposts/${id}/edit`);
  };

  const handleDelete = async (id) => {
    try {
      await axiosRes.delete(`/currencyposts/${id}/`);
      props.decrementPostTrigger();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`col-md-11 ${styles.scrollBox}`}>
      {posts.map((post, index) => {
        return (
          <div key={index} className={`${styles.window}`}>
            <Row>
              <Col sm={11}>
                <h4>{post.topic}</h4>
              </Col>
              <Col sm={1}>
                {post.is_owner && (
                  <PostDropdown
                    handleEdit={() => handleEdit(post.id)}
                    handleDelete={() => handleDelete(post.id)}
                  />
                )}
              </Col>
              <Col sm={12}>
                <p>{post.created_at}</p>
              </Col>
            </Row>

            <Row>
              <Col sm={12}>
                <p className={styles.greyText}>{post.content}</p>
              </Col>
            </Row>

            {post.image &&
              post.image !==
                "https://res.cloudinary.com/dzw4z92rn/image/upload/v1/media/../default_post_ltn67t" && (
                <Row>
                  <Col sm={12}>
                    <img src={post.image} alt="Post" className={styles.Image} />
                    <p className={styles.greyText}>{post.content}</p>
                  </Col>
                </Row>
              )}

            <Row>
              <Col sm={2}>
                <Avatar src={post.image} alt="Profile" height={30} />
              </Col>
              <Col sm={8}>
                <p>{post.user}</p>
              </Col>
            </Row>
          </div>
        );
      })}
    </div>
  );
};

export default ShowPosts;
