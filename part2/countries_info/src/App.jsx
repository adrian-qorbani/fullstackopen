import { useState, useEffect } from "react";
import Header from "./components/Header";
import CountryForm from "./components/CountryForm";
import Footer from "./components/Footer";
import CountryTable from "./components/CountryTable";
import countryService from "./services/country";

function App() {
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    countryService.getCountry().then((response) => {
      setAPIData(response);
    });
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchCountry(e.target.value);
    if (searchCountry !== "") {
      const filteredData = APIData.filter((country) => {
        return Object.values(country.name.common)
          .join("")
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setFilteredResults(filteredData);
    }
  };

  // const onClickShow = (e) => {
  //   console.log(e)
  //   setSearchCountry([e])
  // }

  return (
    <>
      <Header />
      <CountryForm
        filteredCountries={searchCountry}
        evHandler={handleSearchInputChange}
      />
      <CountryTable apiData={filteredResults} setFilteredResults={setFilteredResults} />
      <Footer />
    </>
  );
}

export default App;
