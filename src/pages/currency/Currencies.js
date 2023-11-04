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
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import styles from "../../styles/Currency.module.css";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

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

  const handleRowClick = (id) => {
    navigate(`/currencies/${id}`);
  };

  useEffect(() => {
    getCurrencies();
    console.log("getFavourites within useEffect about to be called");
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
                      <i
                        className="far fa-star"
                        style={{ cursor: "not-allowed" }}
                      />
                    </OverlayTrigger>
                  )}
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
