import axios from "axios";

const BASE_URL = "https://connectplace.herokuapp.com/api/";
const BASE_URL_DEV = "http://localhost:5000/api/";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

/* Change for BASE_URL in prod and BASE_URL_DEV for dev */
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const API_URL = BASE_URL;

/* Change for BASE_URL in prod and BASE_URL_DEV for dev */
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});