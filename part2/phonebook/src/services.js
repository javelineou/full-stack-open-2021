import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (nameObject) => {
  return axios.post(baseUrl, nameObject);
};

const update = (nameObject, idKey) => {
  return axios.put(`${baseUrl}/${idKey}`, nameObject);
};

const service = { getAll, create, update };
export default service;
