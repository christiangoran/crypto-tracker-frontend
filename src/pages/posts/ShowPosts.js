import React, { useEffect, useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "../../styles/ShowPosts.module.css";
import Avatar from "../../components/Avatar";
import { PostDropdown } from "../../components/PostDropdown";
import { useNavigate } from "react-router-dom";

const ShowPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currencyId } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosRes.get(
          `/currencyposts/?currency=${currencyId}`
        );
        const matchingPosts = data.results.filter(
          (post) => post.currency === Number(currencyId)
        );
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

  const handleEdit = async (id) => {
    props.handleEditPost(id);
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
    <div className={`col-md-10 mx-auto ${styles.scrollBox}`}>
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
                <Row className={styles.dist}>
                  <Col sm={12}>
                    <img src={post.image} alt="Post" className={styles.Image} />
                  </Col>
                </Row>
              )}

            <Row>
              <Col sm={2}>
                <Avatar src={post.profile_image} alt="Profile" height={60} />
              </Col>
              <Col sm={10}>
                <p className={styles.largerText}>{post.user}</p>
              </Col>
            </Row>
          </div>
        );
      })}
    </div>
  );
};

export default ShowPosts;
