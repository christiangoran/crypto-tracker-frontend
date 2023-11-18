import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import axios from "axios";
import axiosRes from "../api/axiosDefaults";

export const Favourite = (props) => {
  const [favourites, setFavourites] = useState([]);
  const [errors, setErrors] = useState([]);
  const { currency, currentUser } = props;

  const getFavourites = async () => {
    try {
      const { data } = await axios.get("/favouritecurrencies/");
      setFavourites(data.results);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const toggleFavourite = async () => {
    const favourite = favourites.find((fav) => fav.currency === currency.id);

    try {
      if (favourite) {
        await axiosRes.delete(`/favouritecurrencies/${favourite.id}/`);
      } else {
        const { data } = await axios.post("/favouritecurrencies/", {
          currency: currency.id,
        });
        setFavourites([...favourites, data]);
      }
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
