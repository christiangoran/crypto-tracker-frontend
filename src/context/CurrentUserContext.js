//HTTP Requests:
import axios from "axios";
//Custom HTTP Interceptors:
import { axiosReq, axiosRes } from "../api/axiosDefaults";
//UI Framework components:
import { createContext, useContext, useEffect, useMemo, useState } from "react";
//Routing:
import { useNavigate } from "react-router-dom"; // useHistory in older version
//Utilities:
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

//----------------------------------------------------------------

//To create a context, the createContext function has to be called
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

//To make it easier to access useCurrentUser & useSetCurrentUser
//I create two curstom hooks that I give the same names
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

//----------------------------------------------------------------
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  //----------------------------------------------------------------
  const handleMount = async () => {
    try {
      //axiosRes is a response interceptor to make sure the
      //access token is valid, and refresh it if needed.
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      // console.log(err);
    }
  };
  //----------------------------------------------------------------
  useEffect(() => {
    handleMount();
  }, []);
  //----------------------------------------------------------------
  //JWT interceptor function.
  //useMemo hook is used to cache complex values that takes time
  //to compute. Here the useMemo hook runs and attaches interceptors
  //before the children are mounted.
  useMemo(() => {
    // Request interceptor is attached to axiosReq instance from axiosDefaults.js

    // The use() method in Axios interceptors applies two functions:
    // The first argument handles the request configuration before
    // sending it, and the second argument handles any errors in the request process.
    const requestInterceptor = axiosReq.interceptors.request.use(
      async (config) => {
        // Before sending the request, check if the token needs refreshing
        if (shouldRefreshToken()) {
          try {
            // Attempt to refresh the token
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            // If the token refresh fails
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate("/signin"); // use navigate instead of history.push
              }
              // Return 'null' to update the state indicating the user is logged out
              return null;
            });
            removeTokenTimestamp();
            // Return the original request configuration to proceed with the request
            return config;
          }
        }
        // If no token refresh is needed, proceed with the original request configuration
        return config;
      },
      (err) => {
        // In case of a request error, reject the promise to
        //handle the error where the request was made
        return Promise.reject(err);
      }
    );

    //Response interceptor is attached to axiosRes instance from
    //axiosDefaults.js

    //The use() method here together with axios interceptors, the
    //first argument is executed and the second argument is
    //an optional function that handles errors. Like in this case
    //a potential 401 error because of an expired token.
    const responseInterceptor = axiosRes.interceptors.response.use(
      //If there is no error, the response is returned. All good.
      (response) => response,
      //Second argument catches if there is an error
      async (err) => {
        //Check if the error status is 401 (unauthorized)
        if (err.response?.status === 401) {
          try {
            //Attempt to refresh the token
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            //If refreshing the token fails
            setCurrentUser((prevCurrentUser) => {
              //If there was a previously logged in user
              if (prevCurrentUser) {
                //Redirect to sigin-in page for re-authentication
                navigate("/signin");
              }
              //The function inside the setCurrentUser returns
              //'null', ensuring that the user is no longer
              //authenticated
              return null;
            });
            //Removes the token timestamp from browser cache
            //as part of cleaning after expired/invalid session.
            removeTokenTimestamp();
          }
          //And if the refresh was successful the interceptor
          //retries the original request that resulted in
          //an 401
          //'err.config' is used to replicate the exact configuration
          //of the original request, including the URL, headers,
          //method, etc.
          return axios(err.config);
        }
        //In case the error wasn't a 401 we reject the
        //promise with the error to exit the interceptor
        return Promise.reject(err);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosReq.interceptors.request.eject(requestInterceptor);
      axiosRes.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]); // Add navigate to the dependency array

  //----------------------------------------------------------------
  return (
    //Every context object comes with a Provider component that
    //allows child components to subscribe to context changes.

    //A Provider accepts a value prop to be passed to child
    //components that need to consume that value.

    //In this case the value being passed is currentUser and
    //setCurrentUser.
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
