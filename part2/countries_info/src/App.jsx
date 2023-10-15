import { useState, useEffect } from "react";
import Header from "./components/Header";
import CountryForm from "./components/CountryForm";
import Footer from "./components/Footer";
import CountryTable from "./components/CountryTable";
import countryService from "./services/country";

function App() {
  const [APIData, setAPIData] = useState([]);

  // showTable 0 [no data], 1 [countries list] , 2 [country details]
  // const [showTable, setShowTable] = useState(1);

  const [searchCountry, setSearchCountry] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

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
          .includes(searchCountry.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  return (
    <>
      <Header />
      <CountryForm
        filteredCountries={searchCountry}
        evHandler={handleSearchInputChange}
      />
      <CountryTable apiData={filteredResults} />
      <Footer />
    </>
  );
}

export default App;
