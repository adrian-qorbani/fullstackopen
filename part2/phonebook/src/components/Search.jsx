const Search = ({filteredPerson, evHandler}) => {
  return (
    <div>
      Search: <input value={filteredPerson} onChange={evHandler} />
    </div>
  );
};

export default Search