import React, {useState, useEffect} from "react";

import items from "../data";

import usePersistedState from "../hooks/usePersistedState";

export const GameContext = React.createContext(null);



export const GameProvider = ({ children }) => {


    const [numCookies, setNumCookies] = usePersistedState(1000, "num-cookies");

    const [purchasedItems, setPurchasedItems] = usePersistedState(

      {
        cursor: 0,
        grandma: 0,
        farm: 0,
      },
      "purchased-items"
    );
  
    const calculateCookiesPerSecond = (purchasedItems) => {


        return Object.keys(purchasedItems).reduce((acc, itemId) => {

            console.log("items", items);
            const numOwned = purchasedItems[itemId];
            console.log("purchasedItems itemId", itemId);
            const item = items.find((item) => item.id === itemId);
            console.log("item", item);
            const value = item.value;
            
            return acc + value * numOwned;
          }, 0);
    };
  
    return (
      <GameContext.Provider
        value={{
          numCookies,
          setNumCookies,
          purchasedItems,
          setPurchasedItems,
          cookiesPerSecond: calculateCookiesPerSecond(purchasedItems),
        }}
      >
        {children}
      </GameContext.Provider>
    );
};