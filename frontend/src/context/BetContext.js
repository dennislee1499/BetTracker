import React, { createContext, useReducer } from "react";

export const BetsContext = createContext();

export const betsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BETS':
            return {
                bets: action.payload
            }
        case 'CREATE_BET':
            return {
                bets: [action.payload, ...state.bets]
            }
        default: 
            return state
    }
}

const BetsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(betsReducer, {
        bets: null
    })


    return (
        <BetsContext.Provider value={{ ...state, dispatch }}>
            { children }
        </BetsContext.Provider>
    )
}

export default BetsContextProvider;
