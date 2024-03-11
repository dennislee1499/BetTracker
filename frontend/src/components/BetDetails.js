import { useBetsContext } from "../hooks/useBetsContext"

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

    return (
        <div className="bet-details">
            <h4>{bet.title}</h4>
            <p><strong>Date Placed ('YYYY-MM-DD'):</strong>{bet.date}</p>
            <p><strong>Sport:</strong>{bet.sport}</p>
            <p><strong>Amount Wagered:</strong>{bet.amountWagered}</p>
            <p><strong>Odds (-110, 110):</strong>{bet.odds}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
        </div>
    )
}

export default BetDetails;