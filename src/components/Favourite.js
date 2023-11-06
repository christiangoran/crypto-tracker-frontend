import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
  Table,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import btnStyles from "../styles/Button.module.css";
import appStyles from "../App.module.css";
import styles from "../styles/Currencies.module.css";
import { useCurrentUser } from "../context/CurrentUserContext";
import { axiosRes } from "../api/axiosDefaults";

export const Favourite = (props) => {
  const [favourites, setFavourites] = useState([]);
  const [errors, setErrors] = useState([]);
  const { currency, currentUser } = props;

  const getFavourites = async () => {
    try {
      const { data } = await axios.get("/favouritecurrencies/");
      setFavourites(data.results);
      console.log(data.results);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const toggleFavourite = async (currencyId) => {
    const favourite = favourites.find((fav) => fav.currency === currencyId);

    try {
      if (favourite) {
        console.log("just before the delete request", currencyId, favourite.id);
        await axiosRes.delete(`/favouritecurrencies/${favourite.id}/`);
      } else {
        const { data } = await axios.post("/favouritecurrencies/", {
          currency: currencyId,
        });
        setFavourites([...favourites, data]);
      }
      console.log("getFavourites within toggleFavourite about to be called");
      getFavourites();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  useEffect(() => {
    getFavourites();
  }, []);

  return (
    <Container
      onClick={(e) => {
        e.stopPropagation();
        toggleFavourite(currency.id);
      }}
    >
      {currentUser ? (
        <i
          className={
            favourites.some(
              (favCurrency) => favCurrency.currency === currency.id
            )
              ? "fas fa-star"
              : "far fa-star"
          }
          style={{
            color: favourites.some(
              (favCurrency) => favCurrency.currency === currency.id
            )
              ? "#ff9200"
              : undefined,
            cursor: "pointer",
          }}
        />
      ) : (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Log in to select currencies!</Tooltip>}
        >
          <i className="far fa-star" style={{ cursor: "not-allowed" }} />
        </OverlayTrigger>
      )}
    </Container>
  );
};
