import React, {useState} from "react";

import arrowBottom from "@icons/arrow-bottom.svg";

import styles from "./styles.module.css";

const SearchCurrency = () => {
  const [currency, useCurrency] = useState("ETH");

  const imageUrl = "https://changenow.io/images/coins/btc.svg";

  return (
    <>
      <button type="button" className={styles.searchButton}>
        <img src={imageUrl} className={styles.currencyIcon}></img>
        <span className={styles.currencyTitle}>{currency}</span>
        <img src={arrowBottom} className={styles.arrowIcon}></img>
      </button>
      <input type="search" placeholder="Search" className={styles.searchField} />
      <ul className={styles.list}>
        <li className={styles.item}></li>
        <li className={styles.item}></li>
      </ul>
    </>
  );
};

export default SearchCurrency;
