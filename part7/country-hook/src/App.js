import Country from './components/Country'
import { useCountry } from './hooks'

const App = () => {

  const country = useCountry('country')

  //const countries = useCountries()

  return (
    <div>
      <div>
        find countries <input
          {...country.filter}
        />
      </div>
      <Country country={country.foundCountry} />
    </div>
  )
}
export default App;
