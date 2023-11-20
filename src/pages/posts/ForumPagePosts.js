import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import { Row, Col } from "react-bootstrap";
import styles from "../../styles/ForumPage.module.css";

export const ForumPagePosts = ({
  currencyFilter,
  setCurrencyFilter,
  updateTrigger,
  handleEditPost,
  decrementPostTrigger,
}) => {
  const [posts, setPosts] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllPages = async (url = "/currencies/") => {
    try {
      const response = await axios.get(url);
      const fetchedCurrencies = response.data.results;

      if (response.data.next) {
        return fetchedCurrencies.concat(
          await fetchAllPages(response.data.next)
        );
      } else {
        return fetchedCurrencies;
      }
    } catch (error) {
      //   console.error("Error fetching currencies:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const allCurrencies = await fetchAllPages();
        setCurrencies(allCurrencies);
      } catch (error) {
        // console.error("Error fetching currencies:", error);
      }
    };
    fetchCurrencies();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (currencyFilter) params.append("currency", currencyFilter);
        const response = await axios.get("/currencyposts/", { params });
        setPosts(response.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [currencyFilter, updateTrigger]);

  const handleCurrencyChange = (e) => {
    setCurrencyFilter(e.target.value);
  };

  if (isLoading)
    return (
      <div>
        <p>Loading posts...</p>
      </div>
    );
  if (error)
    return (
      <div>
        <p>Error loading posts.</p>
      </div>
    );

  return (
    <div className="col-md-12 mx-auto">
      <Row>
        <Col sm={12}>
          <div>
            <select
              className={`${styles.narrowSelect} form-select mx-auto`}
              value={currencyFilter}
              onChange={handleCurrencyChange}
            >
              <option value="">Select Currency</option>
              {currencies.map((currency) => (
                <option key={currency.id} value={currency.id}>
                  {currency.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.scrollBox}>
            {posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                handleEditPost={handleEditPost}
                decrementPostTrigger={decrementPostTrigger}
              />
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ForumPagePosts;
