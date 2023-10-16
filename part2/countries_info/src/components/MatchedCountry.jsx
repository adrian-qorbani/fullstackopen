const MatchedCountry = ({apiData, setFilteredResults}) => {
  return (
    <table>
    <thead>
      <tr>
        <th scope="col">Country Name</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      {apiData.map((country) => {
        return (
          <tr key={country.name.common}>
            <td>{country.name.common}</td>
            <td><button onClick={() => setFilteredResults([country])}>Show</button></td>
          </tr>
        );
      })}
    </tbody>
  </table>
  )
}

export default MatchedCountry