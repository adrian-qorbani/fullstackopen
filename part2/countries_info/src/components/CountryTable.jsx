
const CountryTable = ({ apiData }) => {
  if (apiData.length == 0) {
    return (
      <div className="card">
        <p>
          No <code>data</code> found.
        </p>
      </div>
    );
  } else if (apiData.length > 9) {
    return (
      <div className="card">
        <p>
          Too many <code>matches</code>, specify another filter..
        </p>
      </div>
    );
  } else if (apiData.length == 1) {
    return (
      <article>
        <div className="grid">
          <div>
            <img src={apiData[0].flags.png} />
            <h1>{apiData[0].name.common}</h1>
          </div>
          <div>
            <hgroup>
              <h5>Capital</h5>
              <h5>{apiData[0].capital[0]}</h5>
            </hgroup>
            <hgroup>
              <h5>Area</h5>
              <h5>{apiData[0].area}</h5>
            </hgroup>
            <hgroup>
              <h5>Region</h5>
              <h5>{apiData[0].region}</h5>
            </hgroup>
          </div>
          <div>
            <h5>Languages</h5>
            <ul>
              {Object.entries(apiData[0].languages).map(([key, value]) => {
                return (
                  <li key={key} >{value}</li>
                )
              })}
            </ul>
          </div>
          <div>
            <hgroup>
              <h5>Weather</h5>
              <h5>in Helsinki</h5>
            </hgroup>
            Temp: 32 C
          </div>
        </div>
      </article>
    );
  } else {
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
    );
  }
};

export default CountryTable;
