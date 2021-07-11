import React, {useState} from "react";

import arrowBottom from "@icons/arrow-bottom.svg";
import close from "@icons/close.svg";

import styles from "./styles.module.css";

const SearchCurrency = ({isLoading, currencies, onChange}) => {

  const startCurrency = currencies ? Math.floor(Math.random() * currencies.length) : 0
  const [currencyName, setCurrencyName] = useState(currencies && currencies[startCurrency].ticker)
  const [currencyIcon, setCurrencyIcon] = useState(currencies && currencies[startCurrency].image)
  const [searchValue, setSearchValue] = useState('')
  const [searchFieldStyles, setSearchFieldStyles] = useState('hidden')

  const searchClick = () => {
    if (searchFieldStyles === 'hidden'){
      setSearchFieldStyles(styles.container)
    }
    else {
      setSearchFieldStyles('hidden')
    }
  }
  
  const choiseCurrency = (event) => {
    console.log(event.target);
    // onChange('AD') тут меняем стэйт родителя
  }
  let findedCurrencies = null;
  const searchElements = (event) => {
    setSearchValue(event.target.value)

    findedCurrencies = currencies.map(element => {
      if (element.ticker.includes(event.target.value)) {
        return (<li className={styles.item}>
           <button type="button" className={styles.searchButton} onClick={searchClick}>
            <div className={styles.container}>
              <img src={element.image} className={styles.currencyIcon}></img>
              <span className={styles.currencyTitle}>{element.ticker}</span>
              <img src={arrowBottom} className={styles.arrowIcon}></img>
            </div>
            </button>
        </li>)
      }
      
    })
  }

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
      <input type="search" placeholder="Search" className={styles.searchField} value={searchValue} onChange={searchElements} />
      <button type="button" className={styles.closeButton}>
        <img src={close} className={styles.arrowIcon} onClick={searchClick}></img>
      </button>
      <ul  onClick={choiseCurrency}>
        {findedCurrencies}
      </ul>
      </div>
    </div>
  );
};

export default SearchCurrency;
