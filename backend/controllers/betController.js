const Bet = require('../models/betModel');
const mongoose = require('mongoose');

// GET all bets 
const getBets = async (req, res) => {
    const bets = await Bet.find({}).sort({formattedDate: -1})

    res.status(200).json(bets);
}

// GET a single bet 
const getBet = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such bet' })
    }

    const bet = await Bet.findById(id)

    if (!bet) {
        return res.status(404).json({ error: 'No such bet' })
    }

    res.status(200).json(bet)
}

// CREATE new bet
const createBet = async (req, res) => {
    const { date, sport, title, amountWagered, odds } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title')
    }
    if (!date) {
        emptyFields.push('date')
    }
    if (!sport) {
        emptyFields.push('sport')
    }
    if (!amountWagered) {
        emptyFields.push('amountWagered')
    }
    if (!odds) {
        emptyFields.push('odds')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    // add doc to db
    try {
        const bet = await Bet.create({ date, sport, title, amountWagered, odds })
        res.status(200).json(bet)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// DELETE a bet 
const deleteBet = async (req, res) => {
    const { id } = req.params 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such bet' })
    }

    const bet = await Bet.findOneAndDelete({ _id: id })

    if (!bet) {
        return res.status(404).json({ error: 'No such bet' })
    }
    
    res.status(200).json(bet)
}

// UPDATE a bet
const updateBet = async (req, res) => {
    const { id } = req.params
    const { date, sport, title, amountWagered, odds } = req.body;
    
    let emptyFields = [];

    if (!title) {
        emptyFields.push('title')
    }
    if (!date) {
        emptyFields.push('date')
    }
    if (!sport) {
        emptyFields.push('sport')
    }
    if (!amountWagered) {
        emptyFields.push('amountWagered')
    }
    if (!odds) {
        emptyFields.push('odds')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such bet' })
    }

    const bet = await Bet.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!bet) {
        return res.status(404).json({ error: 'No such bet' })
    }

    res.status(200).json(bet)
}

module.exports = {
    createBet,
    getBets,
    getBet,
    deleteBet,
    updateBet
}
