import { jwtDecode } from "jwt-decode";

//This function sets a token timestamp in the browsers storage
//it will accept the data object returned by the API on login
export const setTokenTimestamp = (data) => {
  //the jwtDecode comes with the jwt-decode library to decode
  //the refresh token. The token has an expiry date with they key of exp
  //We save the decoded value to refreshTokenTimestamp
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  //and put the value into the browser using localStorage
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

//This function returns a boolean value that tells if the
//users token need to be refreshed or not.
export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
