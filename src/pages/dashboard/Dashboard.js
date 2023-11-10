import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../../styles/Dashboard.module.css";
import { Favourite } from "../../components/Favourite";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../context/CurrentUserContext";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

export const Dashboard = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const [userProfile, setUserProfile] = useState({});
  const [favourites, setFavourites] = useState([]);
  const [currencies, setCurrencies] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      console.log("Dashboard: currentUser.id:", currentUser.profile_id);
      try {
        const urls = [
          `/profiles/${currentUser.profile_id}/`,
          `/favouritecurrencies/`,
          `/currencies/`,
        ];

        const requests = urls.map((url) => axiosRes.get(url));

        const responses = await Promise.all(requests);

        const [profileResponse, favouritesResponse, currenciesResponse] =
          responses.map((response) => response.data);

        setUserProfile(profileResponse);
        setFavourites(favouritesResponse.results);
        setCurrencies(currenciesResponse.results);
        console.log("Dashboard - favouritesResponse:", favouritesResponse);
        console.log("Dashboard - currenciesResponse:", currenciesResponse);
        console.log("Dashboard - profileResponse:", profileResponse);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentUser) {
      handleMount();
    }
  }, [currentUser]);

  //  This formats the numbers in the table to currency format
  function formatNumbers(value, locale = "en-US", currency = "USD") {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  const profileFavourites = (
    <>
      <Row>
        {favourites.map((favourite) => {
          const matchedCurrency = currencies.find(
            (currency) => currency.id === favourite.currency
          );

          return matchedCurrency ? (
            <Col sm={3} key={favourite.id} className={styles.windowBright}>
              <h2>{matchedCurrency.name}</h2>
              <h3>{matchedCurrency.symbol}</h3>
              <p>{formatNumbers(matchedCurrency.current_price)}</p>
              <Favourite currencyId={currencies} currentUser={currentUser} />
              {console.log("matchedCurrency:", matchedCurrency)}
            </Col>
          ) : null;
        })}
      </Row>
    </>
  );

  return (
    <div>
      <Container className="col-md-10 mx-auto">
        <Row>
          <Col sm={8} className={styles.window}>
            <p className={styles.p}>Portfolio</p>
            <h1>Name here soon</h1>
            <h3 className={styles.greyText}>@{userProfile.user}</h3>
          </Col>

          <Col sm={3} className={styles.window}>
            <p className={styles.greyText}>
              <Avatar
                src={currentUser.profile_image}
                alt="Profile"
                height={180}
              />
            </p>
            <p>No. Of Currencies: {userProfile.favourite_currencies_count}</p>
          </Col>
        </Row>

        <Row>
          <Col lg={8} className={styles.window}>
            <h3>Selected Currencies:</h3>
            <>{profileFavourites}</>
          </Col>

          <Col lg={3} className={styles.window}>
            <h3>Background:</h3>
            <p className={styles.greyText}>
              Buzz Lightyear is a daring space ranger known across the galaxy
              for his bravery and unwavering commitment to protecting the
              universe from the threat of invasion by the evil Emperor Zurg.
              With his iconic suit equipped with retractable wings and a laser
              arm cannon, he embarks on thrilling interstellar adventures,
              always by the motto, "To infinity and beyond!" Despite being a
              toy, Buzz's belief in his mission as a defender of the cosmos
              inspires those around him, both toy and human alike. His legendary
              status is forever etched in the stars and the hearts of children
              everywhere who dream of their own spacefaring heroics.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
