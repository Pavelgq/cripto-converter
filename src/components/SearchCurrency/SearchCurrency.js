import React, {useState, useEffect} from "react";

import arrowBottom from "@icons/arrow-bottom.svg";
import close from "@icons/close.svg";

import styles from "./styles.module.css";
import CurrencyItem from "@components/CurrencyItem/CurrencyItem";

const SearchCurrency = ({isLoading, currencies, onChange}) => {
  const startCurrency = currencies ? Math.floor(Math.random() * currencies.length) : 0;
  const [currencyName, setCurrencyName] = useState(
    currencies && currencies[startCurrency].ticker
  );
  const [currencyIcon, setCurrencyIcon] = useState(
    currencies && currencies[startCurrency].image
  );
  const [searchValue, setSearchValue] = useState("");
  const [searchFieldStyles, setSearchFieldStyles] = useState("hidden");
  const [items, setItems] = useState([])

    useEffect(() => {
      onChange(startCurrency)
    }, [])

  const searchClick = (event) => {
    console.log(event.target)
    if (searchFieldStyles === "hidden") {
      setSearchFieldStyles(styles.searchWrapper)
    } else {
      setSearchFieldStyles("hidden")
      setSearchValue('')
    }
  };

  const choiseCurrency = (index) => {
    onChange(index)
    console.log(index)
    setCurrencyName(currencies[index].ticker)
    setCurrencyIcon(currencies[index].image)
  }
  
  const searchElements = (event) => {
    setSearchValue(event.target.value);
    const searchValue = event.target.value.toLowerCase()
    console.log(searchValue) 
    currencies = currencies.filter((element) => element.ticker.includes(searchValue))
    setItems(currencies.map((element, index) => <CurrencyItem key={index} id={index} ticker={element.ticker} imageUrl={element.image} searchClick={choiseCurrency}/>) ) 

    console.log(currencies, items)
  };

  return (
    <div className={styles.complexField}>
      <input
        type="text"
        value="0,023"
        className={`${styles.textField} ${styles.numberField}`}
      />
      <button type="button" className={styles.searchButton} onClick={searchClick}>
        <div className={styles.container}>
          <img src={currencyIcon} className={styles.currencyIcon}></img>
          <span className={styles.currencyTitle}>{currencyName}</span>
          <img src={arrowBottom} className={styles.arrowIcon}></img>
        </div>
      </button>
      <div className={searchFieldStyles}>
        <div className={styles.container}>
          <input
            type="search"
            placeholder="Search"
            className={styles.searchField}
            value={searchValue}
            onChange={searchElements}
          />
          <button type="button" className={styles.closeButton}>
            <img src={close} className={styles.closeIcon} onClick={searchClick}></img>
          </button>
        </div>
        <ul className={styles.list}>{items}</ul>
      </div>
    </div>
  );
};

export default SearchCurrency;
