import React, { Children, createContext, useContext } from 'react'

const typingContext = createContext();

const DataProvider = ({children}) => {

  return (
    <typingContext.Provider value={{}}>
      {children}
    </typingContext.Provider>
  );
};

export const useTypingData =()=>{
    return useContext(typingContext);
}

export default DataProvider;
