import axios from "axios";

export default axios.create({
  baseURL: "https://mapcharts-api.onrender.com",
  withCredentials: true,
});
