import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";
// const baseUrl = '/api/blogs'

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const blogDelete = (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.delete(`${baseUrl}/${id}`, config)
  console.log(`${id} is removed`)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken, blogDelete };
