import React, {useState, useEffect} from "react";

import arrowSwapLeft from "@icons/arrow-swap-left.svg";
import arrowSwapRight from "@icons/arrow-swap-right.svg";

import {apiKey} from "~/secret.js";

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
  const [valueFrom, setValueFrom] = useState(1);
  const [valueTo, setValueTo] = useState(0);

  const [minAmount, setMinAmount] = useState(0);
  const [flagChangeTicker, setFlagChangeTicker] = useState(false);
  const [flagExchange, setFlagExchange] = useState(false);
  const [error, setError] = useState("");

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
      setConvertFrom(appState.currencies[0]);
      setConvertTo(appState.currencies[1]);
      setValueTo(valueFrom * minAmount);
    }
  }, [appState.currencies]);

  useEffect(() => {
    if (convertFrom && convertTo && flagChangeTicker) {
      setError("");
      const apiUrl = `https://api.changenow.io/v1/min-amount/${convertFrom.ticker}_${convertTo.ticker}?api_key=${apiKey}`;
      fetch(apiUrl).then((res) => {
        const responsePromise = res.json();
        setMinAmount(res.minAmount);
        responsePromise
          .then((data) => {
            if (res.status >= 400) {
              console.log(error);
              setError("Pair is inactive");
            } else {
              setMinAmount(data.minAmount);
            }
          })
          .catch((error) => {
            console.log(error);
            setError("Pair is inactive");
          });
      });
      setFlagChangeTicker(false);
    }
  }, [flagChangeTicker]);

  useEffect(() => {
    if (convertFrom && convertTo && minAmount && flagExchange) {
      setError("");
      fetch(
        `https://api.changenow.io/v1/exchange-amount/${minAmount}/${convertFrom.ticker}_${convertTo.ticker}?api_key=${apiKey}`
      )
        .then((response) => response.json())
        .then((result) => {
          setValueTo(result.estimatedAmount);
        })
        .catch((error) => {
          console.log("error", error);
          setError(error.message);
        });
      setFlagExchange(false);
    }
  }, [flagExchange]);

  const changeCurrencies = () => {
    const temp = convertFrom;
    setConvertFrom(convertTo);
    setConvertTo(temp);
    const valueTemp = valueFrom;
    setValueFrom(valueTo);
    setValueTo(valueTemp);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFlagExchange(true);

    // console.log(convertFrom, convertTo, minAmount)
    // console.log("Exchange",convertFrom.value, minAmount, minAmount*convertFrom.value);
    // setConvertTo({...convertTo, value: minAmount*convertFrom.value})
  };

  const changeConvertFrom = (object, value) => {
    if (convertFrom.ticker !== value.ticker) {
      setFlagChangeTicker(true);
    }
    setConvertFrom(object);
    setValueFrom(value);
  };

  const changeConvertTo = (object, value) => {
    if (convertFrom.ticker !== value.ticker) {
      setFlagChangeTicker(true);
    }
    setConvertTo(object);
    setValueTo(value);
  };

  if (appState.loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Crypto Exchange</h1>
          <span className={styles.subTitle}>Crypto Exchange</span>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <fieldset className={styles.group}>
            <SearchCurrency
              isLoading={appState.loading}
              currencies={appState.currencies}
              current={convertFrom}
              currentValue={valueFrom}
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
              currentValue={valueTo}
              onChange={changeConvertTo}
            />
          </fieldset>

          <fieldset className={styles.group}>
            <legend className={styles.fieldLegend}>Your Ethereum address</legend>
            <input type="text" className={styles.textField} />
            <div className={styles.exchangeWrapper}>
              <button type="submit" className={styles.button}>
                Exchange
              </button>
              {error && <span className={styles.errorMessage}>{error}</span>}
            </div>
          </fieldset>
        </form>
      </div>
    </main>
  );
};

export default App;
