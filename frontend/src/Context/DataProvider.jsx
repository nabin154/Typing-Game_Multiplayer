import React, { Children, createContext, useContext, useState } from 'react'

const typingContext = createContext();

const DataProvider = ({children}) => {
  
  const [startTestTime , setStartTestTime] = useState(null);
  const [margin , setMargin] = useState(0);
  const [seconds, setSeconds] = useState(120);
  const [difficultyMode , setDifficultyMode] = useState('easy');



  return (
    <typingContext.Provider value={{
      startTestTime,
      setStartTestTime,
      margin,
      setMargin,
      seconds,
      setSeconds,
      difficultyMode,
      setDifficultyMode
    }}>
      {children}
    </typingContext.Provider>
  );
};

export const useTypingData =()=>{
    return useContext(typingContext);
}

export default DataProvider;
