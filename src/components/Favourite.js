//React & React Hooks:
import React, { useState } from "react";
//HTTP Requests:
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
//UI Framework Components:
import { OverlayTrigger, Tooltip } from "react-bootstrap";

//----------------------------------------------------------------

export const Favourite = (props) => {
  const [errors, setErrors] = useState([]);
  const { currencyId, currentUser, favourites, setFavourites } = props;

  //----------------------------------------------------------------
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
        await axiosReq.delete(`/favouritecurrencies/${favourite.id}/`);
        // Update the favorites by removing the deleted favorite
        setFavourites(favourites.filter((fav) => fav.currency !== currencyId));
      } else {
        //If there was no match and the selected currency is a new favourite,
        //a post request is sent to add the currency to the favourite array.
        const { data } = await axiosReq.post("/favouritecurrencies/", {
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

  return (
    <td
      onClick={(e) => {
        //Enables the user to click on the specific cell to choose
        //a favourite without triggering row specific click that
        //would lead the user to another currency page.
        e.stopPropagation();
        //the select favourite function is called with the
        //currency specific id as an argument.
        toggleFavourite(currencyId);
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
              (favCurrency) => favCurrency.currency === currencyId
              //If true, and there is a match, a solid star fas fa-star
              //is displayed, otherwise an empty star is displayed.
            )
              ? "fas fa-star"
              : "far fa-star"
          }
          style={{
            //Again same principle, color uses some() method to see
            //if any currency in favourites array matches the current
            //currency id.
            color: favourites.some(
              (favCurrency) => favCurrency.currency === currencyId
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
          <i className="far fa-star" style={{ cursor: "not-allowed" }} />
        </OverlayTrigger>
      )}
    </td>
  );
};
