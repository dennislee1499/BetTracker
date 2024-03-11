const BetDetails = ({ bet }) => {
    return (
        <div className="bet-details">
            <h4>{bet.title}</h4>
            <p><strong>Date Placed ('YYYY-MM-DD'):</strong>{bet.date}</p>
            <p><strong>Sport ('NBA', 'NCAAB', 'NFL'):</strong>{bet.sport}</p>
            <p><strong>Amount Wagered:</strong>{bet.amountWagered}</p>
            <p><strong>Odds ('-110', '110'):</strong>{bet.odds}</p>
        </div>
    )
}

export default BetDetails;