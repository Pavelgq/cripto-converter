import React, {createContext, useContext, useState} from "react";

const CurrencyContext = createContext();

export const CurrencyProvider = ({children}) => {
  const [data, setData] = useState({});

  const setValues = (values) => {
    setData((prevData) => ({
      ...prevData,
      ...values,
    }));
  };
  return (
    <CurrencyContext.Provider value={{data, setValues}}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useData = () => useContext(CurrencyContext);
