import axios from "axios";

export const retrieveAllKeywords = () => {
  return axios.get(`http://localhost:8081/allKeywords`);
};

export const retrieveProperties = () => {
  return axios.get(`http://localhost:8081/allProperties`);
};

export const setAssesmentReview = (studentId, object) => {
  return axios.post(
    `http://localhost:8081/setAssesmentReview/${studentId}`,
    object
  );
};

export const getAssesmentReview = (studentId) => {
  return axios.get(`http://localhost:8081/getAssesmentReview/${studentId}`);
};
