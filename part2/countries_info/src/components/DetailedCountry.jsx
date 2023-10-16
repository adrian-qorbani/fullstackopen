import { useState, useEffect } from "react";
import axios from "axios";

const DetailedCountry = ({apiData}) => {
  const [capitalWeather, setCapitalWeather] = useState([]) 

  useEffect(() => {

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${apiData[0].capital[0]}&appid=${apiKey}`)
      .then(response => {
        const apiResponse = response.data;
        setCapitalWeather([apiResponse])
      }).catch(error => {
        console.log(error);
    })
  })

  return (
    <article>
      <div className="grid">
        <div>
          <img src={apiData[0].flags.png} />
          <h1>{apiData[0].name.common}</h1>
        </div>
        <div>
          <hgroup>
            <h5>Capital</h5>
            <h5>{apiData[0].capital[0]}</h5>
          </hgroup>
          <hgroup>
            <h5>Area</h5>
            <h5>{apiData[0].area}</h5>
          </hgroup>
          <hgroup>
            <h5>Region</h5>
            <h5>{apiData[0].region}</h5>
          </hgroup>
        </div>
        <div>
          <h5>Languages</h5>
          <ul>
            {Object.entries(apiData[0].languages).map(([key, value]) => {
              return <li key={key}>{value}</li>;
            })}
          </ul>
        </div>
        <div>
          <hgroup>
            <h5>Weather</h5>
            <h5>in {apiData[0].capital[0]}</h5>
          </hgroup>
          {capitalWeather[0].main.temp} °C
        </div>
      </div>
    </article>
  );
};

export default DetailedCountry;
