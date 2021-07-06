import React, {useState} from 'react';

import SearchCurrency from '@components/SearchCurrency/SearchCurrency'

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
    <div className={styles.container}>
      <h1 className={styles.title}>Crypto Exchange</h1>
      <span className={styles.subTitle}>Crypto Exchange</span>

      <form className={styles.form}>
        <fieldset className={styles.group}>
          <input type="text" value="0,023" className={styles.textField} />
          <SearchCurrency />
          <span>vs</span>
          <input type="text" value="1,1165462" className={styles.textField} />
          <SearchCurrency />
        </fieldset>

        <fieldset className={styles.group}>
          <legend className={styles.fieldLegend}>Your Ethereum address</legend>
          <input type="text" className={styles.textField} />
          <button type="submit" className={styles.button}>Exchange</button>
        </fieldset>
      </form>

    </div>
  );
}

export default App;
