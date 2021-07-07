import React, {useState} from "react";

import arrowSwapLeft from "@icons/arrow-swap-left.svg";
import arrowSwapRight from "@icons/arrow-swap-right.svg";

import SearchCurrency from "@components/SearchCurrency/SearchCurrency";

import styles from "./App.module.css";

const App = () => {
  //  const  [currency, setCurrency] = useState('')

  //   useEffect(() => {
  //     setFilteredCurrency(
  //       currency.filter((country) =>
  //         country.name.toLowerCase().includes(search.toLowerCase())
  //       )
  //     );
  //   }, [search, currency]);

  //   if (loading) {
  //     return <p>Loading...</p>;
  //   }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Crypto Exchange</h1>
        <span className={styles.subTitle}>Crypto Exchange</span>

        <form className={styles.form}>
          <fieldset className={styles.group}>
            <div className={styles.wrapper}>
              <input
                type="text"
                value="0,023"
                className={`${styles.textField} ${styles.numberField}`}
              />
              <SearchCurrency />
            </div>
            <button type="button" className={styles.swapButton}>
              <img src={arrowSwapLeft}></img>
              <img src={arrowSwapRight}></img>
            </button>
            <div className={styles.wrapper}>
              <input
                type="text"
                value="1,1165462"
                className={`${styles.textField} ${styles.numberField}`}
              />
              <SearchCurrency />
            </div>
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
