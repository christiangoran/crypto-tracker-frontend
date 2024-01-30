//React & React Hooks:
import React, { useEffect, useState } from "react";
//Routing
import { useNavigate } from "react-router-dom";
//HTTP Requests:
import axios from "axios";
import { axiosRes } from "../../api/axiosDefaults";
//UI Framework components:
import { Image, Table, Tooltip, OverlayTrigger } from "react-bootstrap";
//Styling:
import styles from "../../styles/Currencies.module.css";
import appStyles from "../../App.module.css";
//Context/Hooks:
import { useCurrentUser } from "../../context/CurrentUserContext";
//Utilities:
import {
  formatLargeNumbers,
  formatNumbers,
} from "../../utils/NumbersFormatting";
import { Favourite } from "../../components/Favourite";

//----------------------------------------------------------------

export const LandingPageCurrencies = () => {
  //Current user context
  const currentUser = useCurrentUser();
  //State for retrieved currency data
  const [currencies, setCurrencies] = useState([]);
  //State for by user selected favourite currencies
  const [favourites, setFavourites] = useState([]);
  const [errors, setErrors] = useState([]);

  // for programatically redirecting users
  const navigate = useNavigate();
  //----------------------------------------------------------------
  //Is triggered on mount to retrieve currency data
  //from backend API. (Authorization not required.)
  const getCurrencies = async () => {
    try {
      const response = await axios.get("/currencies/");
      //Number of currencies to populate currencies state
      //is limited to 10 items for landing page.
      setCurrencies(response.data.results.slice(0, 10));
    } catch (err) {
      setErrors(err.response?.data);
    }
  };
  //----------------------------------------------------------------
  // Triggered on mount to retrieve user-specific favorite currencies.
  // Each request implicitly includes an access/refresh token
  // in its header to identify the user and validate their access to the resource.
  //(Authorization required.)
  const getFavourites = async () => {
    try {
      const { data } = await axiosRes.get("/favouritecurrencies/");
      setFavourites(data.results);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  //----------------------------------------------------------------
  //Handles when user clicks on a specific currency
  //and programatically directs them to the dedicated
  //Currency page
  const handleRowClick = (id) => {
    navigate(`/currencies/${id}`);
  };

  useEffect(() => {
    getCurrencies();
    getFavourites();
  }, []);
  //----------------------------------------------------------------
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
            {/* The function maps through each currency one by one calling
          each single one 'currency' in the function. */}
            {currencies.map((currency) => (
              <tr
                key={currency.id}
                //When user clicks on the currency row, they are
                //directed to relevant currency specific page
                onClick={() => handleRowClick(currency.id)}
                style={{ cursor: "pointer" }}
              >
                {/* Currency ID cell */}
                <td className={`${styles.textLeft} ${styles.tdHd}`}>
                  {currency.id}
                </td>
                {/* Currency logo, name and symbol cell */}
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
                {/* Current price of currency */}
                <td className={styles.centerText}>
                  {formatNumbers(currency.current_price)}
                </td>
                {/* Current market cap of currency */}
                <td className={styles.centerText}>
                  {formatLargeNumbers(currency.market_cap)}
                </td>
                {/* Total volume of currency */}
                <td className={styles.centerText}>
                  {formatLargeNumbers(currency.total_volume)}
                </td>
                {/* Toggle favourite Component */}
                <Favourite
                  currencyId={currency.id}
                  currentUser={currentUser}
                  favourites={favourites}
                  setFavourites={setFavourites}
                />
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
