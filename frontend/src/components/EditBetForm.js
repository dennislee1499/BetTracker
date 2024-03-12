import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useBetsContext } from '../hooks/useBetsContext';

const EditBetForm = () => {
    const { dispatch } = useBetsContext();
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [sport, setSport] = useState('');
    const [amountWagered, setAmountWagered] = useState('');
    const [odds, setOdds] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    useEffect(() => {
        const fetchBet = async () => {
            const res = await fetch(`/api/bets/${id}`)
            const json = await res.json() 
            
            if (res.ok) {
                setTitle(json.title)
                const localDate = json.date.split("T")[0]
                setDate(localDate)
                setSport(json.sport)
                setAmountWagered(json.amountWagered)
                setOdds(json.odds)
            } else {
                setError('Could not fetch bet details')
            }
        }
        fetchBet();
    }, [id])

    const handleEdit = async (e) => {
        e.preventDefault(); 

        let newEmptyFields = [];
        if (!title) newEmptyFields.push('title');
        if (!title) newEmptyFields.push('date');
        if (!title) newEmptyFields.push('sport');
        if (!title) newEmptyFields.push('amountWagered');
        if (!title) newEmptyFields.push('odds');

        const updatedBet = {title, date, sport, amountWagered, odds}

        const res = await fetch(`/api/bets/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedBet),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await res.json()

        if (!res.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields || [])
        } else {
            dispatch({type: 'UPDATE_BET', payload: json})
            setEmptyFields([])
            navigate('/');
        }
    }

    return (
        <form className='edit-bet-form' onSubmit={handleEdit}>
            <h3>Edit Bet</h3>

            <label>Bet Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Date:</label>
            <input 
              type="Date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              className={emptyFields.includes('date') ? 'error' : ''}
            />

            <label>Sport:</label>
            <select
                onChange={(e) => setSport(e.target.value)}
                value={sport}
                className={emptyFields.includes('sport') ? 'error' : ''}
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
              className={emptyFields.includes('amountWagered') ? 'error' : ''}
            />

            <label>Odds:</label>
            <input 
              type="number"
              onChange={(e) => setOdds(e.target.value)}
              value={odds}
              className={emptyFields.includes('odds') ? 'error' : ''}
            />

            <button type="submit">Update Bet</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default EditBetForm;