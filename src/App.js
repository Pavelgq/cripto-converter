import React, {useState, useEffect} from "react";

import arrowSwapLeft from "@icons/arrow-swap-left.svg";
import arrowSwapRight from "@icons/arrow-swap-right.svg";

import {apiKey} from '~/secret.js'

import {CurrencyProvider} from "@contexts/CurrencyContext";
import SearchCurrency from "@components/SearchCurrency/SearchCurrency";

import styles from "./App.module.css";

const App = () => {
  const [appState, setAppState] = useState({
    loading: false,
    currencies: null,
  });

  const [convertFrom, setConvertFrom] = useState(null);
  const [convertTo, setConvertTo] = useState(null);
  const [minAmount, setMinAmount] = useState(0);
  const [flagChangeTicker, setFlagChangeTicker] = useState(false)

  useEffect(() => {
    setAppState({loading: true});
    const apiUrl = `https://api.changenow.io/v1/currencies?active=true`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((currencies) => {
        setAppState({loading: false, currencies: currencies});
      });
  }, [setAppState]);

  useEffect(() => {
    if (!appState.loading && appState.currencies) {
        setConvertFrom({...appState.currencies[0], value: 1})
        setConvertTo({...appState.currencies[1], value: 1*minAmount})
      }
  }, [appState.currencies])

  useEffect(() => {
    if (convertFrom && convertTo && flagChangeTicker) {
      const apiUrl = `https://api.changenow.io/v1/min-amount/${convertFrom.ticker}_${convertTo.ticker}?api_key=${apiKey}`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then((res) => {
          setMinAmount(res.minAmount);
        });
        setFlagChangeTicker(false)
    }
  }, [flagChangeTicker])


  const changeCurrencies = () => {
    const temp = convertFrom;
    setConvertFrom(convertTo);
    setConvertTo(temp);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   await fetch(`https://api.changenow.io/v1/exchange-amount/${minAmount}/${convertFrom.ticker}_${convertTo.ticker}?api_key=${apiKey}`, )
    .then(response => response.text())
    .then(result => {
      setConvertTo({...convertTo, value: result.estimatedAmount})
    })
    .catch(error => {
      console.log('error', error)
    });

    // console.log(convertFrom, convertTo, minAmount)
    // console.log("Exchange",convertFrom.value, minAmount, minAmount*convertFrom.value);
    // setConvertTo({...convertTo, value: minAmount*convertFrom.value})
  };

  const changeConvertFrom = (value) => {
    if (convertFrom.ticker !== value.ticker) {
      setFlagChangeTicker(true)
    }
    setConvertFrom(value)
  }

  const changeConvertTo = (value) => {
    if (convertFrom.ticker !== value.ticker) {
      setFlagChangeTicker(true)
    }
    setConvertTo(value)
  }

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
              onChange={changeConvertFrom}
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
              onChange={changeConvertTo}
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
