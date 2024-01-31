//React & React Hooks:
import React, { useState, useRef, useEffect } from "react";
//HTTP Interceptor:
import { axiosReq } from "../../api/axiosDefaults";
//UI Framework Components:
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
//Styling:
import btnStyles from "../../styles/Button.module.css";

//----------------------------------------------------------------

const CurrencyPostForm = ({
  currencyId,
  editPost,
  isEditing,
  onPostUpdated,
  incrementPostTrigger,
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

  const formRef = useRef(null);
  const imageInput = useRef();

  // Deconstruct postData state for easier access to its properties:
  // 'topic', 'content', and 'image'
  const { topic, content, image } = postData;

  //----------------------------------------------------------------

  //This useEffect call is only executed if the values passed down from
  //handleEditPost function in parent components are true and contain
  //an id for the specific post that the user selected for edit.
  useEffect(() => {
    const fetchEditPost = async () => {
      try {
        const { data } = await axiosReq.get(`/currencyposts/${editPost}/`);
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
    //The get request is only sent if isEditing state is 'true' and
    //there is a post-specific id to request the right object from API
    if (isEditing && editPost) {
      fetchEditPost();
    }
  }, [currencyId, editPost, isEditing]);

  //----------------------------------------------------------------

  useEffect(() => {
    if (typeof image === "string") {
      setPreviewImage(image);
    }
  }, [image]);

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

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

  //----------------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    //This validation step is for the Forumpage where posts for all
    //Currencies can be viewed and where user has to choose where
    //to put their post.
    if (!currencyId) {
      setAlertContent("Please select a currency before submitting.");
      setShowAlert(true);
      return;
    }

    const formData = new FormData();
    formData.append("topic", topic);
    formData.append("content", content);
    formData.append("currency", currencyId);

    if (image && image instanceof File) {
      formData.append("image", image);
    }

    try {
      let data;
      //If isEditing is 'true' the form is being used to edit an existing post
      //therefore an HTTP PUT request is made
      if (isEditing) {
        data = await axiosReq.put(`/currencyposts/${editPost}/`, formData);
        onPostUpdated(); //Function in parent component CurrencyPage.js
        setAlertContent("Post edit was successful!");
      } else {
        //If isEditing is false it is a new post creation and a
        //HTTP Post request is made instead
        data = await axiosReq.post("/currencyposts/", formData);
        //Invokes a function in parent component through props
        incrementPostTrigger();
        setAlertContent("Post creation was successful!");
      }
      //After submitting post, the formfield is reset using a
      //ref to the form element
      formRef.current.reset();
      setPostData({
        topic: "",
        content: "",
        image: "",
        currency: currencyId,
      });
      setShowAlert(true);
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

  //----------------------------------------------------------------

  return (
    <div className="col-md-8 mx-auto">
      {/* User notification functionality */}
      {showAlert && (
        <Alert variant="success" onClose={handleCloseAlert} dismissible>
          {alertContent}
        </Alert>
      )}
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Row>
          {/* Topic text field */}
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
          {/* Content text field */}
          <Col sm={12}>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="What does the TA tell you, going up, going down? Let us know!"
              onChange={handleChange}
              value={content}
              name="content"
            />
          </Col>
        </Row>

        {/* Image selection */}
        <Form.Control
          type="file"
          id="image-upload"
          accept="image/*"
          rows={2}
          ref={imageInput}
          onChange={handleChangeImage}
        />

        {(isEditing && typeof image === "string") || image instanceof File ? (
          <img
            src={isEditing ? image : URL.createObjectURL(image)}
            alt="Selected"
            style={{ width: "300px", height: "auto" }}
          />
        ) : null}

        <Button
          type="submit"
          //Disables the button if isEditing is 'false' and there
          //is nothing entered in the content field.
          //Prevents submitting empty posts.
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
