const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const betSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    sport: {
        type: String,
        required: true,
        enum: ['NBA', 'NCAAB', 'NFL', 'NCAAF', 'MLB', 'MLS', 'UFC', 'NHL', 'ATP']
    },
    title: {
        type: String,
        required: true
    },
    amountWagered: {
        type: Number, 
        required: true
    },
    odds: {
        type: Number,
        required: true
    },
    outcome: {
        type: String,
        enum: ['Win', 'Loss'],
        required: false
    },
    profitLoss: {
        type: Number,
        required: false
    }
}); 

module.exports = mongoose.model('Bet', betSchema);