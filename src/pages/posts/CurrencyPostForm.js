import React, { useState, useRef, useEffect } from "react";
import { Form, Button, InputGroup, Col, Row } from "react-bootstrap";
import { useCurrentUser } from "../../context/CurrentUserContext";
import Avatar from "../../components/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { axios, axiosRes, axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/CurrencyPostForm.module.css";
import btnStyles from "../../styles/Button.module.css";

const CurrencyPostForm = ({
  currencyId,
  onPostCreated,
  editPost,
  isEditing,
  onPostUpdated,
}) => {
  const [errors, setErrors] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [postData, setPostData] = useState({
    topic: "",
    content: "",
    image: "",
    currency: currencyId,
  });
  const { topic, content, image } = postData;
  const currentUser = useCurrentUser();
  const formRef = useRef(null);

  const imageInput = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log("3?");

    const fetchEditPost = async () => {
      try {
        const { data } = await axiosRes.get(`/currencyposts/${editPost}/`);
        setPostData({
          topic: data.topic,
          content: data.content,
          image: data.image,
          currency: currencyId,
        });
        console.log("4 -this is the edit post data image", data.image);
      } catch (err) {
        console.log(err);
      }
    };

    if (isEditing && editPost) {
      fetchEditPost();
    }
  }, [editPost, isEditing, axiosRes]);

  useEffect(() => {
    if (typeof image === "string") {
      setPreviewImage(image);
    }
  }, [image]);

  // const handleChangeImage = (e) => {
  //   setPostData({
  //     ...postData,
  //     image: e.target.files[0], // this is the file object and only takes one file
  //   });
  // };

  const handleChangeImage = (event) => {
    //This function is only for changing preview image in edit
    if (event.target.files.length) {
      //contains the new file object
      URL.revokeObjectURL(image); // Removes any old image from the preview
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
      console.log("this is the new image", event.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("topic", topic);
    formData.append("content", content);
    if (image && typeof image === "object") {
      formData.append("image", postData.image);
    }

    formData.append("currency", currencyId);
    console.log("this is the form data", formData);
    try {
      let data;
      if (isEditing) {
        console.log("this is the edit post id", editPost);
        data = await axiosReq.put(`/currencyposts/${editPost}/`, formData);
        setPostData({
          topic: "",
          content: "",
          image: "",
          currency: currencyId,
        });
        onPostUpdated(); //Function in parent component CurrencyPage.js
      } else {
        console.log("this is the else statement axios post request");
        data = await axiosReq.post("/currencyposts/", formData);
        setPostData({
          topic: "",
          content: "",
          image: "",
          currency: currencyId,
        });
        onPostCreated();
      }
      formRef.current.reset();
      setPostData({
        topic: "",
        content: "",
        image: "",
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
    <div className="col-md-10 mx-auto">
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Row>
          <Col sm={12}>
            <Form.Control
              as="textarea"
              rows={1}
              placeholder="my topic..."
              onChange={handleChange}
              value={topic}
              name="topic"
            />
          </Col>
          <Col sm={12}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="What does the TA tell you, going up, going down...?"
              onChange={handleChange}
              value={content}
              name="content"
            />
          </Col>
        </Row>

        <Form.Control
          type="file"
          id="image-upload"
          accept="image/*"
          ref={imageInput}
          onChange={handleChangeImage}
        />

        {isEditing && typeof image === "string" && (
          <img
            src={image}
            alt="Current"
            style={{ width: "100px", height: "auto" }}
          />
        )}

        <Button
          type="submit"
          disabled={!isEditing && !content.trim()}
          className={`${btnStyles.Button} ${btnStyles.Dark}`}
        >
          Post Comment
        </Button>
      </Form>
    </div>
  );
};

export default CurrencyPostForm;
