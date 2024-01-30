//React & React Hooks:
import React, { useEffect, useState } from "react";
//Routing:
import { useNavigate } from "react-router-dom";
//HTTP Requests:
import { axiosRes } from "../../api/axiosDefaults";
//UI Framework Components
import { Col, Row } from "react-bootstrap";
//Styling
import styles from "../../styles/ShowPosts.module.css";
//Local Components
import Avatar from "../../components/Avatar";
import { PostDropdown } from "../../components/PostDropdown";

//----------------------------------------------------------------

const ShowPosts = ({ currencyId, handleEditPost }) => {
  const [posts, setPosts] = useState([]);
  const [updatePostTrigger, setUpdatePostTrigger] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  //----------------------------------------------------------------
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosRes.get(
          `/currencyposts/?currency=${currencyId}`
        );
        setPosts(data.results);
        setLoading(false);
      } catch (err) {
        // console.log(err);
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currencyId, updatePostTrigger]);

  //----------------------------------------------------------------

  const handleEdit = async (id) => {
    handleEditPost(id);
  };

  const handleDelete = async (id) => {
    try {
      await axiosRes.delete(`/currencyposts/${id}/`);
      decrementPostTrigger();
    } catch (err) {
      // console.log(err);
    }
  };
  const decrementPostTrigger = () => {
    setUpdatePostTrigger((prev) => prev - 1);
  };
  //----------------------------------------------------------------

  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }
  //----------------------------------------------------------------

  return (
    <div className={`col-md-10 mx-auto ${styles.scrollBox}`}>
      {/* Iterate through all the post objects */}
      {posts.map((post, index) => {
        return (
          <div key={index} className={`${styles.window}`}>
            <Row>
              {/* Post topic column */}
              <Col sm={11}>
                <h4>{post.topic}</h4>
              </Col>
              <Col sm={1}>
                {/* Conditional rendering enabling an authenticated user
                    to see a dropdown menu to edit their posts */}

                {/* Use arrow functions to pass the specific post ID 
                    from this .map iteration to the edit and delete handlers, 
                    which will then propagate the action up to the parent 
                    component. */}
                {post.is_owner && (
                  <PostDropdown
                    handleEdit={() => handleEdit(post.id)}
                    handleDelete={() => handleDelete(post.id)}
                  />
                )}
              </Col>

              {/* Post created at column */}
              <Col sm={12}>
                <p>{post.created_at}</p>
              </Col>
            </Row>
            {/* Post content */}
            <Row>
              <Col sm={12}>
                <p className={styles.greyText}>{post.content}</p>
              </Col>
            </Row>

            {/* Conditional rendering - if there is a posted image url in the
            post object and it is not the default image url - 
            rendering the image in the post iteration. */}
            {post.image &&
              post.image !==
                "https://res.cloudinary.com/dzw4z92rn/image/upload/v1/media/../default_post_ltn67t" && (
                <Row className={styles.dist}>
                  <Col sm={12}>
                    <img src={post.image} alt="Post" className={styles.Image} />
                  </Col>
                </Row>
              )}

            {/* Row with avatar profile image and user owning the post */}
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
