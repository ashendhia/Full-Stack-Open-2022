const Country = ({ country }) => {

  if (!country) {
    return (
      <p>
        not found...
      </p>
    )
  }
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <p><strong>languages:</strong></p>
      <ul>
        {
          Object.entries(country.languages).map(([k, v], i) =>
            <li key={i}>{v}</li>
          )
        }
      </ul>
      <img src={country.flags.png} alt={country.name.common} />
    </div>
  )
}

export default Country

