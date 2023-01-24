import axios from "axios";

let store;

export const injectStore = (_store) => {
  store = _store;
};

const instance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
});

export default instance;
