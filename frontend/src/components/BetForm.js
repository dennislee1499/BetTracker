import { useState } from "react";
import { useBetsContext } from "../hooks/useBetsContext";

const BetForm = () => {
    const { dispatch } = useBetsContext();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [sport, setSport] = useState('');
    const [amountWagered, setAmountWagered] = useState('');
    const [odds, setOdds] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bet = {title, date, sport, amountWagered, odds}

        const res = await fetch('/api/bets', {
            method: 'POST',
            body: JSON.stringify(bet),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await res.json()

        if (!res.ok) {
            setError(json.error)
        }
        if (res.ok) {
            setTitle('')
            setDate('')
            setSport('')
            setAmountWagered('')
            setOdds('')
            setError(null)
            dispatch({type: 'CREATE_BET', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Bet</h3>

            <label>Bet Title:</label>
            <input 
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />

            <label>Date:</label>
            <input 
              type="Date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />

            <label>Sport:</label>
            <select
                onChange={(e) => setSport(e.target.value)}
                value={sport}
            >
                <option value="">Select a Sport</option>
                <option value="NBA">NBA</option>
                <option value="NCAAB">NCAAB</option>
                <option value="NFL">NFL</option>
                <option value="NCAAF">NCAAF</option>
                <option value="MLB">MLB</option>
                <option value="MLS">MLS</option>
                <option value="UFC">UFC</option>
                <option value="NHL">NHL</option>
                <option value="ATP">ATP</option>
            </select>

            <label>Amount Wagered:</label>
            <input 
              type="number"
              onChange={(e) => setAmountWagered(e.target.value)}
              value={amountWagered}
            />

            <label>Odds:</label>
            <input 
              type="number"
              onChange={(e) => setOdds(e.target.value)}
              value={odds}
            />
            <button>Add Bet</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default BetForm; 