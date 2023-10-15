// communication with backend
import axios from 'axios';
// const baseUrl = 'https://jz4cvq-3001.csb.app/api/persons';
// const baseUrl = 'http://localhost:3001/api/persons'
const baseUrl = '/api/persons'



const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
const personDelete = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  console.log(`${id} is removed`)
  return request.then(response => response.data)
}
export default {getAll, create, update, personDelete}