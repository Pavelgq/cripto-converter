import React, { useState } from 'react';

const SearchCurrency = () => {
    const [currency, useCurrency] = useState("ETH")

    return (
        <>
            <button type="button" className="" >
                <img ></img>
                <span>{currency}</span>
            </button>
            <input type="search" placeholder="Search"/>
           <ul>
               <li>

               </li>
           </ul>
        </>
    )
}

export default SearchCurrency