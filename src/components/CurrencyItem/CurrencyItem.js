import React from "react";

import styles from "./styles.module.css";

const CurrencyItem = ({id, ticker, imageUrl, searchClick}) => {
  return (
    <li className={styles.item}>
      <button
        type="button"
        className={styles.searchButton}
        onClick={searchClick}
      >
        <div className={styles.container}>
          <img src={imageUrl} className={styles.currencyIcon}></img>
          <span className={styles.currencyTitle}>{ticker}</span>
        </div>
      </button>
    </li>
  );
};

export default CurrencyItem;
