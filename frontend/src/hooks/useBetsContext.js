import { BetsContext } from "../context/BetContext";
import { useContext } from "react";

export const useBetsContext = () => {
    const context = useContext(BetsContext)

    if (!context) {
        throw Error('useBetsContext must be used inside a BetsContextProvider')
    }

    return context
}