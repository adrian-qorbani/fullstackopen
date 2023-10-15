import DetailedCountry from "./DetailedCountry";
import MatchedCountry from "./MatchedCountry";

const CountryTable = ({ apiData }) => {
  if (apiData.length == 0) {
    return (
      <></>
    );
  } else if (apiData.length > 9) {
    return (
      <div className="card">
        <p>
          Too many <code>matches</code>, specify another filter.
        </p>
      </div>
    );
  } else if (apiData.length == 1) {
    return (
      <DetailedCountry apiData={apiData}/>
    );
  } else {
    return (
      <MatchedCountry apiData={apiData}/>
    );
  }
};

export default CountryTable;
