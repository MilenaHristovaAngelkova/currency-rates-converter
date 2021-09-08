import { useState, useEffect } from 'react';
import ConversionsData from './ConversionsData';

function App() {
  const currs = ["usd", "eur", "aud", "cad", "chf", "nzd", "bgn"];
  const [isPending, setIsPending] = useState(true);
  const [errorM, setErrorM] = useState("");
  const [selectedOption, setSelectedOption] = useState("usd");
  const [currencyRates, setCurrencyRates] = useState({});

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/" + selectedOption + ".json")
      .then(res => {
        if (!res.ok) {
          setIsPending(false);
          setErrorM("Could not peform the current fetch request.");
          throw new Error ("Could not peform the current fetch request.")
        }
        return res.json();
      })
      .then(data => {
        let temp = {};
        currs.forEach(curr => {
          temp[curr] = data[selectedOption][curr];
        })

        setIsPending(false);
        setCurrencyRates(temp);
      })
      .catch(err => {
        setIsPending(false);
        setErrorM(err.message);
      })
  }, [selectedOption]);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  }

  return (
    <div className="App">
      <h1>Exchange Rates Information</h1>    
      <form>
        <label htmlFor="currency">See currency rates for: </label>
        <select name="currency" id="currency" defaultValue="usd" onChange={handleChange}>
          {currs.map(curr => {
            return(
              <option value={curr} key={curr}>{curr.toUpperCase()}</option>
            )
          })}
        </select>
      </form>
      {isPending && <p>Loading...</p>}
      {errorM && <p>{ errorM }</p>}
      {!isPending && <ConversionsData selectedOption={selectedOption} currencyRates={currencyRates} />}
    </div>
  );
}

export default App;
