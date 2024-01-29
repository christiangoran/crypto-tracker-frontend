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

  //This async function handles when a user either selects or
  //de-selects a favourite currency by clicking on the star next to it.
  const toggleFavourite = async (currencyId) => {
    //First the favourites array is checked for elements that match the currently
    //clicked currency by the user. The argument passed on is currency.id.
    const favourite = favourites.find((fav) => fav.currency === currencyId);

    try {
      //If there is a match and the currency is already a favourite
      //a delete request is sent to the API endpoint.
      if (favourite) {
        await axiosRes.delete(`/favouritecurrencies/${favourite.id}/`);
        // Update the favorites by removing the deleted favorite
        setFavourites(favourites.filter((fav) => fav.currency !== currencyId));
      } else {
        //If there was no match and the selected currency is a new favourite,
        //a post request is sent to add the currency to the favourite array.
        const { data } = await axios.post("/favouritecurrencies/", {
          currency: currencyId,
        });
        //After successful API post, the currency is also added
        //to the favourites state with a spread operator to not overwrite
        //the rest of the elements in the array.
        setFavourites([...favourites, data]);
      }
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
                {/* Toggle favourite cell */}
                <td
                  onClick={(e) => {
                    //Enables the user to click on the specific cell to choose
                    //a favourite without triggering row specific click that
                    //would lead the user to another currency page.
                    e.stopPropagation();
                    //the select favourite function is called with the
                    //currency specific id as an argument.
                    toggleFavourite(currency.id);
                  }}
                >
                  {/* The td cell element checks wether the global currentUser is 
                trucy or falsy. */}
                  {currentUser ? (
                    <i
                      className={
                        //If true and the user is logged in, it goes through the
                        //favourites array to see if any currencies there match
                        //the current .map(currency) iterations currency.id
                        favourites.some(
                          (favCurrency) => favCurrency.currency === currency.id
                        )
                          ? //If true, and there is a match, a solid star fas fa-star
                            //is displayed, otherwise an empty star is displayed.
                            "fas fa-star"
                          : "far fa-star"
                      }
                      style={{
                        //Again same principle, color uses some() method to see
                        //if any currency in favourites array matches the current
                        //currency id.
                        color: favourites.some(
                          (favCurrency) => favCurrency.currency === currency.id
                        )
                          ? //If true and there is a match, the star will get a
                            //yellow color. Otherwise the color will be undefined/none
                            "#ff9200"
                          : undefined,
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    //If currentUser is falsy, no favourite array matching is
                    //necessary. Only hollow stars will be displayed and a
                    //message till prompt the user to login for the functionality.
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
