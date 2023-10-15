const MatchedCountry = ({apiData}) => {
  return (
    <table>
    <thead>
      <tr>
        <th scope="col">Country Name</th>
      </tr>
    </thead>
    <tbody>
      {apiData.map((country) => {
        return (
          <tr>
            <td>{country.name.common}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
  )
}

export default MatchedCountry