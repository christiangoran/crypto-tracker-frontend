import React, { useEffect, useState } from "react";
import { Image, Table, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import appStyles from "../../App.module.css";
import styles from "../../styles/Currencies.module.css";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

function Currencies(currenciesProp) {
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
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const toggleFavourite = async (currencyId) => {
    const favourite = favourites.find((fav) => fav.currency === currencyId);

    try {
      if (favourite) {
        await axiosRes.delete(`/favouritecurrencies/${favourite.id}/`);
      } else {
        const { data } = await axios.post("/favouritecurrencies/", {
          currency: currencyId,
        });
        setFavourites([...favourites, data]);
      }
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
    getFavourites();
  }, []);

  return (
    <div className={appStyles.Distance}>
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
}

export default Currencies;
