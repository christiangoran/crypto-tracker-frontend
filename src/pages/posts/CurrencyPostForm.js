import React, { useState, useRef } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useCurrentUser } from "../../context/CurrentUserContext";
import Avatar from "../../components/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { axios, axiosRes, axiosReq } from "../../api/axiosDefaults";

const CurrencyPostForm = ({ currencyId }) => {
  const [errors, setErrors] = useState([]);
  const [postData, setPostData] = useState({
    topic: "",
    content: "",
    image: null,
    currency: currencyId,
  });
  const { topic, content, image } = postData;
  const currentUser = useCurrentUser();

  const imageInput = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  //   const handleChangeImage = (e) => {
  //     if (e.target.files[0]) {
  //       setPostData((prevState) => ({
  //         ...prevState,
  //         image: e.target.files[0],
  //       }));
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("topic", topic);
    formData.append("content", content);
    if (postData.image) {
      formData.append("image", postData.image);
    }
    formData.append("currency", currencyId);

    try {
      const { data } = await axiosReq.post("/currencyposts/", formData);
      setPostData({
        topic: "",
        content: "",
        image: null,
        currency: currencyId,
      });
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${currentUser?.profile_id}`}>
            <Avatar
              src={currentUser?.profile_image}
              text="Profile"
              height={25}
            />
          </Link>
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="my topic..."
            onChange={handleChange}
            value={topic}
            name="topic"
          />
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="my comment..."
            onChange={handleChange}
            value={content}
            name="content"
          />
        </InputGroup>
      </Form.Group>
      {/* 
      <Form.File
        id="image-upload"
        accept="image/*"
        ref={imageInput}
        onChange={handleChangeImage}
      /> */}

      <Button variant="dark" type="submit" disabled={!content.trim()}>
        Post Comment
      </Button>
    </Form>
  );
};

export default CurrencyPostForm;
