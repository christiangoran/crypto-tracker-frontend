import React, { useEffect, useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";
import { Col, Row } from "react-bootstrap";
import styles from "../../styles/ShowPosts.module.css";
import Avatar from "../../components/Avatar";

const ShowPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className={`col-md-11 ${styles.scrollBox}`}>
      {posts.map((post, index) => {
        return (
          <div key={index} className={`${styles.window}`}>
            <Row>
              <Col sm={12}>
                <h4>{post.topic}</h4>
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

            <Row>
              <Col sm={2}>
                <Avatar src={post.image} alt="Profile" height={30} />
              </Col>
              <Col sm={8}>
                <h4>{post.user}</h4>
              </Col>
            </Row>
          </div>
        );
      })}
    </div>
  );
};

export default ShowPosts;
