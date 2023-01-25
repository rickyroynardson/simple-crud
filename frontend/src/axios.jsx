import axios from "axios";
import { clearToken, setToken } from "./redux/features/tokenSlice";
import { clearUser } from "./redux/features/userSlice";

let store;

export const injectStore = (_store) => {
  store = _store;
};

const instance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.config.url !== "/login") {
      if (error.response.status === 401) {
        return instance({
          method: "get",
          url: "/refresh",
          headers: {
            refresh_token: store.getState().token.token.refresh,
          },
        })
          .then((res) => {
            store.dispatch(
              setToken({
                ...store.getState().token.token,
                access: res.data.access_token,
              })
            );
            error.config.headers.Authorization = `Bearer ${res.data.access_token}`;
            return instance.request(error.config);
          })
          .catch((error) => {
            store.dispatch(clearUser());
            store.dispatch(clearToken());
            history.go("/login");
          });
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
