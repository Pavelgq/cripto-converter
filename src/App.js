import React, {useState, useEffect} from "react";

import arrowSwapLeft from "@icons/arrow-swap-left.svg";
import arrowSwapRight from "@icons/arrow-swap-right.svg";

import {CurrencyProvider} from "@contexts/CurrencyContext";
import SearchCurrency from "@components/SearchCurrency/SearchCurrency";

import styles from "./App.module.css";

const App = () => {
  const [appState, setAppState] = useState({
    loading: false,
    currencies: null,
  });

  const [convertFrom, setConvertFrom] = useState("");
  const [convertTo, setConvertTo] = useState("");

  useEffect(() => {
    setAppState({loading: true});
    const apiUrl = `https://api.changenow.io/v1/currencies?active=true`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((currencies) => {
        setAppState({loading: false, currencies: currencies});
      });
  }, [setAppState]);

  const changeCurrencies = () => {
    //меняем местами стэйты
    const temp = convertFrom;
    setConvertFrom(convertTo)
    setConvertTo(temp)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Exchange");
  };

  if (appState.loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Crypto Exchange</h1>
        <span className={styles.subTitle}>Crypto Exchange</span>

        <form className={styles.form} onSubmit={handleSubmit}>
          <fieldset className={styles.group}>
            <SearchCurrency
              isLoading={appState.loading}
              currencies={appState.currencies}
              current={convertFrom}
              onChange={setConvertFrom}
            />
            <button
              type="button"
              className={styles.swapButton}
              onClick={changeCurrencies}
            >
              <img src={arrowSwapLeft}></img>
              <img src={arrowSwapRight}></img>
            </button>

            <SearchCurrency
              isLoading={appState.loading}
              currencies={appState.currencies}
              current={convertTo}
              onChange={setConvertTo}
            />
          </fieldset>

          <fieldset className={styles.group}>
            <legend className={styles.fieldLegend}>Your Ethereum address</legend>
            <input type="text" className={styles.textField} />
            <button type="submit" className={styles.button}>
              Exchange
            </button>
          </fieldset>
        </form>
      </div>
    </main>
  );
};

export default App;
