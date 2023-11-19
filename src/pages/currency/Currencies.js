import React, { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Pagination from "react-bootstrap/Pagination";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import appStyles from "../../App.module.css";
import styles from "../../styles/Currencies.module.css";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import { Col, Row } from "react-bootstrap";

function Currencies(currenciesProp) {
  const currentUser = useCurrentUser();
  const [currencies, setCurrencies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const itemsPerPage = 32;
  const totalItems = 56;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getCurrencies = async (page = currentPage) => {
    try {
      const response = await axios.get("/currencies/", {
        params: {
          page: page,
          per_page: itemsPerPage,
          search: search,
          ordering: ordering,
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
  }, [currentPage, search, ordering]);

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

  return (
    <div className={appStyles.Distance}>
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
        <Col xs={12} md={3} className="mb-2 mb-md-0">
          <select
            className="form-select"
            value={ordering}
            onChange={handleOrderingChange}
          >
            <option value="">Default Ordering</option>
            <option value="name">Name</option>
            <option value="-market_cap">Market Cap (High to Low)</option>
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
        {renderPagination()}
      </div>
    </div>
  );
}

export default Currencies;
