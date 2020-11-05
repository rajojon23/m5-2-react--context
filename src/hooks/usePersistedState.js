import React, {useState, useEffect} from "react";

export default function usePersistedState(initialValue, storageName) {

    const [stateValue, setStateValue] = useState(() => {
        let genericStorage;

        if(localStorage.getItem(storageName)){
            genericStorage = JSON.parse(localStorage.getItem(storageName));//needs to be JSON parsed before it's returned because it becomes a string
        }
        else{
            genericStorage = initialValue;
        }

        return genericStorage;
    
    });


  useEffect(() => {
    localStorage.setItem(storageName , JSON.stringify(stateValue));//stringify back the parsed object 
  }, [stateValue, storageName]);

    return  [stateValue, setStateValue];
}