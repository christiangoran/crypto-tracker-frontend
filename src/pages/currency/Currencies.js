//React & React Hooks:
import React, { useCallback, useEffect, useState } from "react";
//Routing:
import axios from "axios";
import { useNavigate } from "react-router-dom";
//UI Framework Components:
import { Col, Row, Table, Pagination, Image } from "react-bootstrap";
//Styling:
import appStyles from "../../App.module.css";
import styles from "../../styles/Currencies.module.css";
//Context/Hooks:
import { useCurrentUser } from "../../context/CurrentUserContext";
//Local components:
import TradingViewNewsWidget from "../../components/TradingViewNewsWidget";
import TradingViewSentiment from "../../components/TradingViewSentiment";
import { Favourite } from "../../components/Favourite";
//Utilities:
import {
  formatLargeNumbers,
  formatNumbers,
} from "../../utils/NumbersFormatting";

//----------------------------------------------------------------
function Currencies(currenciesProp) {
  //Current user context
  const currentUser = useCurrentUser();
  //Currencies will return an array of objects
  const [currencies, setCurrencies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  //Pagination, search and ordering states
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  //Pagination variables
  const itemsPerPage = 32;
  const totalItems = 56;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  //----------------------------------------------------------------
  //Is triggered on mount to retrieve currency data
  //from backend API. (Authorization not required.)
  //Is also triggered when user uses the server side
  //search and sort function

  //The use of useCallback here is to preserve function instance
  //across serveral renders to so that currencies are not fetched
  //on every render unless the items in the dependency array
  //changes.
  const getCurrencies = useCallback(
    async (page = currentPage) => {
      try {
        const response = await axios.get("/currencies/", {
          params: {
            page: page, //Pagination item
            per_page: itemsPerPage, //Pagination item
            search: search, //List Search function state
            ordering: ordering, //List Ordering function state
          },
        });
        setCurrencies(response.data.results);
      } catch (err) {
        setErrors(err.response?.data);
      }
    },
    [currentPage, itemsPerPage, search, ordering]
  );
  //----------------------------------------------------------------
  // Triggered on mount to retrieve user-specific favorite currencies.
  // Each request implicitly includes an access/refresh token
  // in its header to identify the user and validate their access to the resource.
  //(Authorization required.)
  const getFavourites = async () => {
    try {
      const { data } = await axios.get("/favouritecurrencies/");
      setFavourites(data.results);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };
  //----------------------------------------------------------------

  useEffect(() => {
    getFavourites();
  }, []); // Fetch only on component mount

  useEffect(() => {
    getCurrencies();
  }, [getCurrencies, currentPage, search, ordering]);

  //----------------------------------------------------------------
  //----------------------------------------------------------------
  //Ordering & Search Functions
  const handleOrderingChange = (e) => {
    setOrdering(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const resetSearch = () => {
    setSearch("");
    setCurrentPage(1);
  };

  const handleRowClick = (id) => {
    navigate(`/currencies/${id}`);
  };

  const renderPagination = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return <Pagination>{items}</Pagination>;
  };

  //----------------------------------------------------------------

  return (
    <div className={appStyles.Distance}>
      <Row className="col-md-10 mx-auto">
        {/* Column with TradingView Component */}
        <Col xs={12} lg={6}>
          <TradingViewNewsWidget />
        </Col>
        {/* Another column with a TradingView Component */}
        <Col xs={12} lg={6}>
          <TradingViewSentiment />
        </Col>
      </Row>
      {/* Row with search and ordering elements */}
      <Row className="col-md-10 mx-auto justify-content-center align-items-center my-3">
        <Col xs={12} md={4} className="mb-2 mb-md-0">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
          />
        </Col>
        {/* form-select field with 4 options for sorting currency list */}
        <Col xs={12} md={3} className="mb-2 mb-md-0">
          <select
            className="form-select"
            value={ordering}
            onChange={handleOrderingChange}
          >
            <option value="">Market Cap High to Low</option>
            <option value="name">Name</option>
            <option value="market_cap">Market Cap (Low to High)</option>
          </select>
        </Col>
        <Col
          xs={12}
          md={4}
          className="d-flex justify-content-md-end justify-content-center"
        >
          <button className="btn btn-primary" onClick={resetSearch}>
            Reset Search
          </button>
        </Col>
        {/* Currency table row */}
      </Row>
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

                {/* Toggle Favourite Component */}
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
        {renderPagination()}
      </div>
    </div>
  );
}

export default Currencies;
