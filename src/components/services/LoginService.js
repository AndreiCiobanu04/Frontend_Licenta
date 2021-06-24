import React from "react";
import axios from "axios";

export const executeJwtAuthService = (username, password) => {
  return axios.post("http://localhost:8081/authenticate", {
    username,
    password,
  });
};

export const registerSuccessful = (username, token) => {
  sessionStorage.setItem("authenticatedUser", username);
  localStorage.setItem("token", createJwtToken(token));
  setupAxiosInterceptors(createJwtToken(token));
};

export const isUserLoggedIn = () => {
  let user = sessionStorage.getItem("authenticatedUser");
  if (user === null) return false;
  return true;
};

export const createJwtToken = (token) => {
  return "Bearer " + token;
};

export const setupAxiosInterceptors = (token) => {
  axios.interceptors.request.use((config) => {
    if (isUserLoggedIn()) {
      config.headers.authorization = token;
    }
    return config;
  });
};

export const existingUser = (username) => {
  return axios.post("http://localhost:8081/existingUser", { username });
};
