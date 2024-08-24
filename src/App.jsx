import { useEffect, useState } from "react";

export default function App() {
  const [curr1, setCurr1] = useState("USD");
  const [curr2, setCurr2] = useState("EUR");
  const [input, setInput] = useState(0);
  const [convRate, setConvRate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const output = input * convRate;

  useEffect(
    function () {
      setIsLoading(true);
      async function fetchCurrency() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=1&from=${curr1}&to=${curr2}`
        );
        const data = await res.json();
        console.log("🚀 ~ fetchCurrency ~ data:", data);
        setConvRate(data.rates[curr2]);
        setIsLoading(false);
      }
      fetchCurrency();
    },
    [curr1, curr2]
  );

  return (
    <div>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
        min={0}
      />
      <select
        value={curr1}
        onChange={(e) => {
          if (e.target.value !== curr2) setCurr1(e.target.value);
        }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="GBP">GBP</option>
      </select>
      <select
        value={curr2}
        onChange={(e) => {
          if (e.target.value !== curr1) setCurr2(e.target.value);
        }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="GBP">GBP</option>
      </select>
      <p>{isLoading ? "Loading..." : `${input} ${curr1} = ${output.toFixed(2)} ${curr2}`}</p>
    </div>
  );
}
