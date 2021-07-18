import React, {useState, useEffect} from "react";

import arrowBottom from "@icons/arrow-bottom.svg";
import close from "@icons/close.svg";

import styles from "./styles.module.css";
import CurrencyItem from "@components/CurrencyItem/CurrencyItem";

const SearchCurrency = ({isLoading, currencies, current = '', onChange}) => {
  const [currencyName, setCurrencyName] = useState(
    current && current.ticker
  );
  const [currencyIcon, setCurrencyIcon] = useState(
    current && current.image
  );
  const [inputValue, setInputValue] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchFieldStyles, setSearchFieldStyles] = useState("hidden");
  const [items, setItems] = useState([]);

  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    if (current) {
      choiseCurrency(current)
    }
  }, [current]);

  const searchClick = () => {
    // console.log(event.target);
    if (toggle) {
      setSearchFieldStyles(styles.searchWrapper);
      setToggle(false)
    } else {
      setSearchFieldStyles("hidden");
      setSearchValue("");
      setItems([]);
      setToggle(true)
    }
  };

  const choiseCurrency = (element) => {
    onChange({...element, value: inputValue});
    setCurrencyName(element.ticker);
    setCurrencyIcon(element.image);
    if (!toggle) {
      searchClick();
    }
  };

  const searchElements = (event) => {
    setSearchValue(event.target.value);
    const searchValue = event.target.value.toLowerCase();
    currencies = currencies.filter((element) => element.ticker.includes(searchValue));
    setItems(
      currencies.map((element, index) => (
        <CurrencyItem
          key={index}
          id={index}
          ticker={element.ticker}
          imageUrl={element.image}
          searchClick={() => choiseCurrency(element)}
        />
      ))
    );
  };

  const handleChange = (event) => {
    setInputValue(event.target.value)
    onChange({...current, value: event.target.value})
  }

  return (
    <div className={styles.complexField}>
      <input
        type="text"
        value={current ? current.value : inputValue}
        className={`${styles.textField} ${styles.numberField}`}
        onChange={handleChange}
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
        <ul className={styles.listResult}>{items}</ul>
      </div>
    </div>
  );
};

export default SearchCurrency;
