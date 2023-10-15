const CountryForm = ({filteredCountries, evHandler}) => {
  return (
    <div>
      <input
        // type="text"
        name="search"
        type="search"
        id="search"
        placeholder="Country ..."
        value={filteredCountries} 
        onChange={evHandler}
      />
      <small>
        Type down complete name of a country to see more details about it.
      </small>
    </div>
  );
};

export default CountryForm;
