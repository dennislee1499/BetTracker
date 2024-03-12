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
        case 'DELETE_BET':
            return {
                bets: state.bets.filter((b) => b._id !== action.payload._id)
            }
        case 'UPDATE_BET':
            return {
                bets: state.bets.map((bet) => 
                    bet._id === action.payload._id ? action.payload : bet
                )
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
