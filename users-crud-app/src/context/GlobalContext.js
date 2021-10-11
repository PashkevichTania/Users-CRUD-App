import {createContext, useState} from 'react';

export const GlobalStateContext = createContext();
export const GlobalDispatchContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const initialState = {
        users: []
    }

    const [state, dispatch] = useState(initialState);

    return (
        <GlobalStateContext.Provider value={state} >
            <GlobalDispatchContext.Provider value={dispatch} >
                {children}
            </GlobalDispatchContext.Provider>
        </GlobalStateContext.Provider>
    );
};


