import { useBetsContext } from "../hooks/useBetsContext";

// date fns
import format from 'date-fns/format';

const BetDetails = ({ bet }) => {
    const { dispatch } = useBetsContext();

    const handleClick = async () => {
        const res = await fetch('/api/bets/' + bet._id, {
            method: 'DELETE'
        })

        const json = await res.json()

        if (res.ok) {
            dispatch({type: 'DELETE_BET', payload: json})
        }
    }

    const formattedDate = format(new Date(bet.date), 'MMMM dd, yyyy');

    return (
        <div className="bet-details">
            <h4>{bet.title}</h4>
            <p><strong>Date Placed:</strong>{formattedDate}</p>
            <p><strong>Sport:</strong>{bet.sport}</p>
            <p><strong>Amount Wagered:</strong>{bet.amountWagered}</p>
            <p><strong>Odds (-110, 110):</strong>{bet.odds}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
        </div>
    )
}

export default BetDetails;