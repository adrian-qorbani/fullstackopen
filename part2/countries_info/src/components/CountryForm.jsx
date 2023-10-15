const CountryForm = ({ addCount, count }) => {
  return (
    <form onSubmit={addCount}>
      {/* <label htmlFor="search">Country Name</label> */}
      <input
        // type="text"
        // id="country"
        name="search"
        type="search"
        id="search"
        placeholder="Country ..."
        required
      />
      <small>
        Type down complete name of a country to see more details about it.
      </small>
      <button type="submit">Search</button>
    </form>
  );
};

export default CountryForm;
