import { useEffect } from "react";
import { useBetsContext } from "../hooks/useBetsContext";

// components
import BetDetails from "../components/BetDetails";
import BetForm from "../components/BetForm";

const Home = () => {
    const { bets, dispatch } = useBetsContext()

    useEffect(() => {
        const fetchBets = async () => {
            const res = await fetch('/api/bets')
            const json = await res.json()

            if (res.ok) {
                dispatch({type: 'SET_BETS', payload: json})
            }
        }
        fetchBets()
    }, [dispatch]);


    return (
        <div className="home">
            <div className="bets">
                {bets && bets.map((bet) => (
                    <BetDetails key={bet._id} bet={bet} />
                ))}
            </div>
            <BetForm />
        </div>
    )
}

export default Home;