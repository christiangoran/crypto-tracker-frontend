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
import styles from "../../styles/Currencies.module.css";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

export const LandingPageCurrencies = () => {
  const currentUser = useCurrentUser();
  const [currencies, setCurrencies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const getCurrencies = async () => {
    try {
      const response = await axios.get("/currencies/");
      setCurrencies(response.data.results.slice(0, 10));
      console.log("this is from landing page receiving the call", currencies);
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

  //  This formats the numbers in the table to currency format
  function formatNumbers(value, locale = "en-US", currency = "USD") {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  // This formats the numbers in the table to a more readable
  function formatLargeNumbers(value) {
    if (value >= 1e3 && value < 1e6) return +(value / 1e3).toFixed(1) + "K";
    if (value >= 1e6 && value < 1e9) return +(value / 1e6).toFixed(1) + "M";
    if (value >= 1e9 && value < 1e12) return +(value / 1e9).toFixed(1) + "B";
    if (value >= 1e12) return +(value / 1e12).toFixed(1) + "T";
  }

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
      <div className="col-md-9 mx-auto">
        <Table
          striped
          bordered
          hover
          className={`${styles.TableStyle} ${styles.tableRoundedCorners}`}
        >
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
                <td className={`${styles.textLeft} ${styles.tdHd}`}>
                  {currency.id}
                </td>
                <td className={styles.textLeft}>
                  <Image
                    className={styles.logo}
                    src={currency.logo_url}
                    alt={`${currency.name} logo`}
                    height={25}
                  />
                  {currency.name} - {currency.symbol}
                </td>
                <td className={styles.centerText}>
                  {formatNumbers(currency.current_price)}
                </td>
                <td className={styles.centerText}>
                  {formatLargeNumbers(currency.market_cap)}
                </td>
                <td className={styles.centerText}>
                  {formatLargeNumbers(currency.total_volume)}
                </td>

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
    </div>
  );
};

export default LandingPageCurrencies;
