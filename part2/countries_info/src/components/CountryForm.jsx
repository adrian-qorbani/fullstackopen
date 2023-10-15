const CountryForm = ({ addCount, count }) => {
  return (
    <form onSubmit={addCount}>
      <label htmlFor="country">Country Name</label>
      <input
        type="text"
        id="country"
        name="country"
        placeholder="Country"
        required
      />
      <small>
        Type down complete name of a country to see more details about it.
      </small>
      <button type="submit">
        count is {count}
      </button>
    </form>
  );
};

export default CountryForm;
