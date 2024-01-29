import axios from "axios";

axios.defaults.baseURL =
  "https://crypto-tracker-heroku-b5acda38c706.herokuapp.com/";

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

//We use these two axios instances to attach token interceptors to
//One for intercepting requests from client side
export const axiosReq = axios.create();
//and one for intercepting responses from server side
export const axiosRes = axios.create();
