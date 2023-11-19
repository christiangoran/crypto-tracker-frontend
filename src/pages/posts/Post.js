import React from "react";
import { Col, Row } from "react-bootstrap";
import styles from "../../styles/Post.module.css";
import Avatar from "../../components/Avatar";
import { PostDropdown } from "../../components/PostDropdown";
import { axiosRes } from "../../api/axiosDefaults";

const Post = ({ post, handleEditPost, decrementPostTrigger }) => {
  const handleEdit = async (id) => {
    handleEditPost(id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;
    try {
      await axiosRes.delete(`/currencyposts/${id}/`);
      decrementPostTrigger();
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div className={`col-md-10 mx-auto ${styles.window}`}>
      <Row>
        <Col sm={10}>
          <h4>{post.topic}</h4>
        </Col>
        <Col sm={2}>
          {" "}
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
};

export default Post;
