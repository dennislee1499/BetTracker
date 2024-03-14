import { Link } from "react-router-dom";
import { useBetsContext } from "../hooks/useBetsContext";


const BetDetails = ({ bet }) => {
    const { dispatch } = useBetsContext();


    const handleDelete = async () => {
        const res = await fetch(`/api/bets/${bet._id}`, {
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
            <p><strong>Date Placed:</strong>{bet.date}</p>
            <p><strong>Sport:</strong>{bet.sport}</p>
            <p><strong>Amount Wagered:</strong>{bet.amountWagered}</p>
            <p><strong>Odds (-110, 110):</strong>{bet.odds}</p>
            <div className="icon-container">
                <span className="material-symbols-outlined" onClick={handleDelete}>Delete</span>
                <Link to={`/edit/${bet._id}`}>
                    <span className="material-symbols-outlined">Edit</span>
                </Link>
            </div>
        </div>
    )
}

export default BetDetails;