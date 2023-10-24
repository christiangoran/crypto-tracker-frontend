import axios from "axios";

axios.defaults.baseURL =
  "https://crypto-tracker-heroku-b5acda38c706.herokuapp.com/";

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
