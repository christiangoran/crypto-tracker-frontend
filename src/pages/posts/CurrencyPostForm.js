import React, { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import { axiosRes, axiosReq } from "../../api/axiosDefaults";
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
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  const { topic, content, image } = postData;
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
    const fetchEditPost = async () => {
      try {
        const { data } = await axiosRes.get(`/currencyposts/${editPost}/`);
        setPostData({
          topic: data.topic,
          content: data.content,
          image: data.image,
          currency: currencyId,
        });
      } catch (err) {
        // console.log(err);
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

  const handleChangeImage = (event) => {
    //This function is only for changing preview image in edit
    if (event.target.files.length) {
      //contains the new file object
      setPostData({
        ...postData,
        image: event.target.files[0],
      });
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currencyId) {
      setAlertContent("Please select a currency before submitting.");
      setShowAlert(true);
      return;
    }
    const formData = new FormData();

    formData.append("topic", topic);
    formData.append("content", content);
    if (image && image instanceof File) {
      formData.append("image", image);
    }

    formData.append("currency", currencyId);
    try {
      let data;
      if (isEditing) {
        data = await axiosReq.put(`/currencyposts/${editPost}/`, formData);
        setPostData({
          topic: "",
          content: "",
          image: "",
          currency: currencyId,
        });
        onPostUpdated(); //Function in parent component CurrencyPage.js
      } else {
        data = await axiosReq.post("/currencyposts/", formData);
        setPostData({
          topic: "",
          content: "",
          image: "",
          currency: currencyId,
        });
        console.log("Post created successfully");
        onPostCreated();
      }
      formRef.current.reset();
      setPostData({
        topic: "",
        content: "",
        image: "",
        currency: currencyId,
      });
      setAlertContent("Post was successfull!");
      setShowAlert(true);
      onPostCreated();
    } catch (err) {
      // console.log(err);
      setAlertContent("There was problem with the submission.");
      setShowAlert(true);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="col-md-8 mx-auto">
      {showAlert && (
        <Alert variant="success" onClose={handleCloseAlert} dismissible>
          {alertContent}
        </Alert>
      )}
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
