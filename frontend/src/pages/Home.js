import { useEffect, useState } from "react";

// components
import BetDetails from "../components/BetDetails";

const Home = () => {
    const [bets, setBets] = useState(null);

    useEffect(() => {
        const fetchBets = async () => {
            const res = await fetch('/api/bets')
            const json = await res.json()

            if (res.ok) {
                setBets(json)
            }
        }
        fetchBets()
    }, []);


    return (
        <div className="home">
            <div className="bets">
                {bets && bets.map((bet) => (
                    <BetDetails key={bet._id} bet={bet} />
                ))}
            </div>
        </div>
    )
}

export default Home;