import { useState, useEffect } from 'react';
import ConversionsData from './ConversionsData';

function App() {
  const currs = ["usd", "eur", "aud", "cad", "chf", "nzd", "bgn"];
  const [isPending, setIsPending] = useState(true);
  const [errorM, setErrorM] = useState("");
  const [selectedOption, setSelectedOption] = useState("usd");
  const [currencyRates, setCurrencyRates] = useState({});
  const [status, setStatus] = useState("");
  let url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/" + selectedOption + ".json";

  let date = new Date();
  let currentDate = date.toLocaleString("az-AZ", {  
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })

  useEffect(() => {
    if (localStorage.getItem(`${selectedOption}-${currentDate}`)) {
      setCurrencyRates(JSON.parse(localStorage.getItem(`${selectedOption}-${currentDate}`)));
      setIsPending(false);
      setStatus('success');
    }

      fetch(url)
        .then(async res => {
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
          setStatus("success");

          let key = `${selectedOption}-${currentDate}`;
          localStorage.setItem(key, JSON.stringify(currencyRates));
        })
        .catch(err => {
          setIsPending(false);
          setErrorM(err.message);
        })
  }, [selectedOption]);

  return (
    <div className="App">
      <h1>Exchange Rates Information</h1>    
      <form>
        <label htmlFor="currency">See currency rates for: </label>
        <select name="currency" id="currency" defaultValue="usd" onChange={(e) => setSelectedOption(e.target.value)}>
          {currs.map(curr => {
            return(
              <option value={curr} key={curr}>{curr.toUpperCase()}</option>
            )
          })}
        </select>
      </form>
      {isPending && <p className="state-info">Loading...</p>}
      {errorM && <p className="state-info">{ errorM }</p>}
      {status === "success" ? <ConversionsData selectedOption={selectedOption} currencyRates={currencyRates} /> : 
        <p className="state-info">Something went wrong.</p>}
    </div>
  );
}

export default App;
