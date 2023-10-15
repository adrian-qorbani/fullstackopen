const CountryTable = ({ tableVisibility }) => {
  switch (tableVisibility) {
    case 0: {
      return (
        <div className="card">
          <p>
            No <code>data</code> found.
          </p>
        </div>
      );
    }
    case 1: {
      return (
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Country Name</th>
              {/* <th scope="col">Details</th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Albania</td>
              {/* <td>
                <button>Show</button>
              </td> */}
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>USA</td>
              {/* <td>
                <button>Show</button>
              </td> */}
            </tr>
          </tbody>
        </table>
      );
    }
    case 2: {
      return (
        <article>
          <div className="grid">
            <div>
              <img src="https://flagcdn.com/w320/fi.png" />
              <h1>Finland</h1>
            </div>
            <div>
              <hgroup>
                <h5>Capital</h5>
                <h5>Helsinki</h5>
              </hgroup>
              <hgroup>
                <h5>Area</h5>
                <h5>338424</h5>
              </hgroup>
              <hgroup>
                <h5>Region</h5>
                <h5>Europe</h5>
              </hgroup>
            </div>
            <div>
              <h5>Languages</h5>
              <ul>
                <li>Finnish</li>
                <li>English</li>
                <li>German</li>
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
    }
  }
};

export default CountryTable;
