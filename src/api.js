import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "9153c2bfeade9c0e083fca0e7d70ba87",
    language: "en-US"
  }
});

export default api;
