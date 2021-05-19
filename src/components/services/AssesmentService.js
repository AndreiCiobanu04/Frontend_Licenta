import axios from "axios";

export const retrieveAllKeywords = () => {
  return axios.get(`http://localhost:8081/allKeywords`);
};

export const retrieveProperties = () => {
  return axios.get(`http://localhost:8081/allProperties`);
};
