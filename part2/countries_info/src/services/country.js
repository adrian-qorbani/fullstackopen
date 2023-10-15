// communication with backend
import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';
// const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/finland'


const getCountry = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default {getCountry}