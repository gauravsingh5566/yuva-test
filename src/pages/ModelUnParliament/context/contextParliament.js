import { createContext, useContext, useEffect, useReducer, useState } from "react";


const Parliamentcontext = createContext();

const ParliamentProvider = ({ children }) => {
const [stepCount,setStepCount] = useState(1)
const contextValue = {
    stepCount,
   setStepCount
   }

  return (
    <Parliamentcontext.Provider value={contextValue}>
      {children}
    </Parliamentcontext.Provider>
  );
};

// custom hooks
const useParliamentContext = () => {
  return useContext(Parliamentcontext);
};

export { ParliamentProvider, Parliamentcontext, useParliamentContext};
