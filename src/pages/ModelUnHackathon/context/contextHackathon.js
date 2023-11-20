import { createContext, useContext, useState } from "react";


const Hackathoncontext = createContext();

const HackathonProvider = ({ children }) => {
const [stepCount,setStepCount] = useState(1)
const contextValue = {
    stepCount,
   setStepCount
   }

  return (
    <Hackathoncontext.Provider value={contextValue}>
      {children}
    </Hackathoncontext.Provider>
  );
};

// custom hooks
const useHackathonContext = () => {
  return useContext(Hackathoncontext);
};

export { HackathonProvider, Hackathoncontext, useHackathonContext};
