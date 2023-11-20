import React, { createContext, useContext, useState} from "react";

export const CFContext = createContext();

export const useMyContext = () =>{
    return useContext(CFContext)
}

export const MyCarbonContextProvider = ({children}) =>{
    const [countStep, setCountStep] = useState(1);

    const values = {
        countStep,
        setCountStep
    }
    return (
        <CFContext.Provider value={values}>
            {children}
        </CFContext.Provider>
    )
}