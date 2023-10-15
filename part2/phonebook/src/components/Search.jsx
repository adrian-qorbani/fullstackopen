const Search = ({filteredPerson, evHandler}) => {
  return (
    <div id="wrapper">
      Search<br /> <input className="input-field" value={filteredPerson} onChange={evHandler} />
    </div>
    
  );
};

export default Search