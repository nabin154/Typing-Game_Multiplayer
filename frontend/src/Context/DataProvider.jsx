import React, { Children, createContext, useContext, useState } from 'react'

const typingContext = createContext();

const DataProvider = ({children}) => {
  const [testStarted, setTestStarted] = useState(false);

  const [startTestTime , setStartTestTime] = useState(null);
  const [margin , setMargin] = useState(0);
  const [seconds, setSeconds] = useState(5);
  const [difficultyMode , setDifficultyMode] = useState('easy');
  const [width, setWidth] = useState(0);
  const [paragraph, setParagraph] = useState('');




  return (
    <typingContext.Provider value={{
      testStarted,
      setTestStarted,
      startTestTime,
      setStartTestTime,
      margin,
      setMargin,
      seconds,
      setSeconds,
      difficultyMode,
      setDifficultyMode,
      width,
      setWidth,
      paragraph,
      setParagraph
    }}>
      {children}
    </typingContext.Provider>
  );
};

export const useTypingData =()=>{
    return useContext(typingContext);
}

export default DataProvider;
