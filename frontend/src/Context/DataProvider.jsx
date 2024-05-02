import React, { Children, createContext, useContext, useState } from 'react'

const typingContext = createContext();

const DataProvider = ({children}) => {
  const [startTestTime , setStartTestTime] = useState(null);
  const [margin , setMargin] = useState(0);
  const [seconds, setSeconds] = useState(120);



  return (
    <typingContext.Provider value={{
      startTestTime,
      setStartTestTime,
      margin,
      setMargin,
      seconds,
      setSeconds
    }}>
      {children}
    </typingContext.Provider>
  );
};

export const useTypingData =()=>{
    return useContext(typingContext);
}

export default DataProvider;
