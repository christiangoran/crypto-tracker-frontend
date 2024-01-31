//React & React Hooks:
import React, { useEffect, useState } from "react";
//Routing:
import { useParams } from "react-router-dom";
//HTTP Reqeusts:
import axios from "axios";
//HTTP Interceptor
import { axiosRes } from "../../api/axiosDefaults";
//UI Framework Components:
import { Col, Row, Container } from "react-bootstrap";
//Styling:
import styles from "../../styles/CurrencyPage.module.css";
//Context/Hooks:
import { useCurrentUser } from "../../context/CurrentUserContext";
//Local Components
import CurrencyPostForm from "../posts/CurrencyPostForm";
import ShowPosts from "../posts/ShowPosts";
import { Favourite } from "../../components/Favourite";
import TradingViewWidget from "../../components/TradingViewWidget";

//----------------------------------------------------------------

function CurrencyPage(props) {
  //Current user context
  const currentUser = useCurrentUser();
  //useParams() hook is used to access URL parameters.
  //This id corresponds to the pk in the backend Django URL pattern
  const { id } = useParams();
  //The specific currency is returned as an object
  const [currency, setCurrency] = useState({});
  const [favourites, setFavourites] = useState([]);
  const [updatePostTrigger, setUpdatePostTrigger] = useState(0);
  const [editPost, setEditPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState([]);

  //----------------------------------------------------------------
  //On mount the data for the page specific currency is retrieved
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosRes.get(`/currencies/${id}/`);
        setCurrency(data);
      } catch (err) {
        // console.log(err);
      }
    };
    handleMount();
    //When id changes if the user visits another currency page
    //then the new currency is fetched from the API.
  }, [id]);

  //To be able to have the favourite child component function
  //the favourites array is retrieved incase user is logged in.
  useEffect(() => {
    const getFavourites = async () => {
      try {
        const { data } = await axios.get("/favouritecurrencies/");
        setFavourites(data.results);
      } catch (err) {
        setErrors(err.response?.data);
      }
    };
    getFavourites();
  }, []); // Fetch only on component mount

  //----------------------------------------------------------------

  // handleEditPost is triggered from ShowPosts. It's called with the ID of
  // the post selected for editing. This ID is then used to fetch the correct
  // post data for editing and set the form in edit mode.
  const handleEditPost = (id) => {
    //The id is passed on to the CurrencyPostForm child component
    //to retrieve the right post object from API and populate
    //the post form for editing.
    setEditPost(id);
    setIsEditing(true);
  };

  // onPostUpdated is invoked after a post is successfully updated in
  // CurrencyPostForm. It increments updatePostTrigger to trigger a re-fetch
  // of posts in ShowPosts and resets the editing state and editPost ID.
  const onPostUpdated = () => {
    setUpdatePostTrigger((prev) => prev + 1);
    setIsEditing(false);
    setEditPost(null);
  };

  // This function changes the value of the UpdatePostTrigger state
  //which is passed down to the ShowPosts child component
  //where it triggers the useEffect hook to fetch updated post data
  const incrementPostTrigger = () => {
    setUpdatePostTrigger((prev) => prev + 1);
  };

  //----------------------------------------------------------------
  return (
    <Container className="col-md-10 mx-auto">
      <Row className="gx-10">
        {/* Column with Currency name */}
        <Col sm={8} className={styles.window}>
          <p className={styles.p}>Rank #{currency.id}</p>
          <h1>{currency.name}</h1>
        </Col>
        {/* Column with currency favourite star icon */}
        <Col sm={4} className={styles.window}>
          <p className={styles.greyText}>Add to your dashboard:</p>

          {/* Favourite component is imported with 4 props */}
          <Favourite
            currencyId={currency.id}
            currentUser={currentUser}
            favourites={favourites}
            setFavourites={setFavourites}
          />
        </Col>
      </Row>

      <Row className="gx-3">
        {/* Column with TradingView price chart */}
        <Col lg={8} className={styles.windowTaller}>
          <TradingViewWidget />
        </Col>
        {/* Column with information about the specific currency */}
        <Col lg={4} className={styles.window}>
          <h3>Background:</h3>
          <p className={styles.greyText}>{currency.description}</p>
        </Col>
      </Row>

      {/* Currency Forum Section */}

      <Row className="col-md-11 mx-auto">
        <Row className="mx-auto">
          <Col md={12} className={styles.distanceTop}>
            <h3 className={styles.centerText}>Currency Forum</h3>
          </Col>
        </Row>

        <Col md={12} className={styles.distanceLessTop}>
          {/* The conditional rendering is here to ensure that the 
        component are not rendered until the currency object has 
        been successfully fetched. To avoid potential errors */}

          {/* 'handleEditPost' is triggered in the PostDropdown 
          component (two components down) and then passed up the 
          component tree to invoke the 'handleEditPost' function 
          defined in this component. */}

          {currency.id && (
            <ShowPosts
              currencyId={currency.id}
              incrementPostTrigger={incrementPostTrigger}
              handleEditPost={handleEditPost}
              updatePostTrigger={updatePostTrigger}
            />
          )}
        </Col>

        <Row className="mx-auto">
          <Col md={12} className={styles.distanceTop}>
            <h3 className={styles.centerText}>Post a Comment</h3>
          </Col>
        </Row>

        <Col md={12}>
          {currentUser ? (
            <CurrencyPostForm
              currencyId={currency.id}
              editPost={editPost}
              isEditing={isEditing}
              incrementPostTrigger={incrementPostTrigger}
              onPostUpdated={onPostUpdated}
            />
          ) : (
            <p className={styles.greyText}>
              You must be logged in to post a comment.
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default CurrencyPage;
