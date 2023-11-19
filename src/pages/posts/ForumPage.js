import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import CurrencyPostForm from "./CurrencyPostForm";
import ForumPagePosts from "./ForumPagePosts";

export const ForumPage = () => {
  const [currencyFilter, setCurrencyFilter] = useState("");
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handlePostCreated = () => {
    setUpdateTrigger((prev) => prev + 1);
  };

  const decrementPostTrigger = () => {
    setUpdateTrigger((prev) => prev - 1);
  };

  const handleEditPost = (id) => {
    setEditPost(id);
    setIsEditing(true);
  };

  const onPostUpdated = () => {
    setUpdateTrigger((prev) => prev + 1);
    setIsEditing(false);
    setEditPost(null);
  };

  useEffect(() => {}, [currencyFilter]);
  return (
    <div className="col-md-10 mx-auto">
      <h1>ForumPage</h1>
      <Row>
        <Col lg={6}>
          <ForumPagePosts
            currencyFilter={currencyFilter}
            setCurrencyFilter={setCurrencyFilter}
            updateTrigger={updateTrigger}
            decrementPostTrigger={decrementPostTrigger}
            handleEditPost={handleEditPost}
          />
        </Col>
        <Col lg={6}>
          <CurrencyPostForm
            currencyId={currencyFilter}
            onPostCreated={handlePostCreated}
            editPost={editPost}
            isEditing={isEditing}
            onPostUpdated={onPostUpdated}
            handleEditPost={handleEditPost}
            decrementPostTrigger={decrementPostTrigger}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ForumPage;
