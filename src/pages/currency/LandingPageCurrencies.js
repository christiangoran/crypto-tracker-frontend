import React, { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/Currencies.module.css";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import {
  formatLargeNumbers,
  formatNumbers,
} from "../../utils/NumbersFormatting";

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

  const handleRowClick = (id) => {
    navigate(`/currencies/${id}`);
  };

  useEffect(() => {
    getCurrencies();
    getFavourites();
  }, []);

  return (
    <div className={appStyles.scrollBoxX}>
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
                    width={25}
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
