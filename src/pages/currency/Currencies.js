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
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import styles from "../../styles/Currency.module.css";
import { useCurrentUser } from "../../context/CurrentUserContext";

function Currencies() {
  const currentUser = useCurrentUser();
  const [currencies, setCurrencies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const getCurrencies = async () => {
    try {
      const response = await axios.get("/currencies/", {
        params: {
          page: 1,
          per_page: 30,
        },
      });
      setCurrencies(response.data.results);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const getFavourites = async () => {
    try {
      const response = await axios.get("/favouritecurrencies/");
      setFavourites(response.data.results);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const toggleFavourite = async (currencyId) => {
    const isFavourite = favourites.some(
      (fav) => fav.currency.id === currencyId
    );
    try {
      if (isFavourite) {
        const favObject = favourites.find(
          (fav) => fav.currency.id === currencyId
        );
        await axios.delete(`favouritecurrencies/${favObject.id}/`);
      } else {
        await axios.post("/favouritecurrencies/", { currency: currencyId });
      }
      getFavourites();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handleRowClick = (id) => {
    navigate(`/currencies/${id}`);
  };

  useEffect(() => {
    getCurrencies();
    getFavourites();
  }, []);

  return (
    <div>
      <div>
        <Table striped bordered hover className={styles.TableStyle}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Market Cap</th>
              <th>Total Volume</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency) => (
              <tr
                key={currency.id}
                onClick={() => handleRowClick(currency.id)}
                style={{ cursor: "pointer" }}
              >
                <td>{currency.id}</td>
                <td>
                  <Image
                    src={currency.logo_url}
                    alt={`${currency.name} logo`}
                    height={25}
                  />
                  {currency.name} - {currency.symbol}
                </td>
                <td>{currency.current_price}</td>
                <td>{currency.market_cap}</td>
                <td>{currency.total_volume}</td>

                <td
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavourite(currency.id);
                  }}
                >
                  <i
                    className={
                      favourites.some((fav) => fav.currency.id === currency.id)
                        ? "fas fa-star"
                        : "far fa-star"
                    }
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <ul></ul>
      <Link to="/cryptocurrencies">
        <Button className={`${btnStyles.Button} ${btnStyles.Dark}`}>
          See More
        </Button>
      </Link>
    </div>
  );
}

export default Currencies;
