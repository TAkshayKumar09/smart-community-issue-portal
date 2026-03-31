import axios from "axios";
axios.defaults.withCredentials = true;
// ADD THIS (AUTO LOGOUT)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      localStorage.getItem("isLoggedIn") === "true"
    ) {
      // 🔥 ONLY logout if user was actually logged in
      window.dispatchEvent(new Event("logout"));
    }

    return Promise.reject(error);
  },
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
