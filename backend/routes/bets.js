const express = require('express');
const {
    createBet,
    getBets,
    getBet,
    deleteBet,
    updateBet
} = require('../controllers/betController')

const Bet = require('../models/betModel');

const router = express.Router();

// GET all bets
router.get('/', getBets)

// GET a single bet
router.get('/:id', getBet)

// POST a new bet
router.post('/', createBet)

// DELETE a bet
router.delete('/:id', deleteBet)

// UPDATE a bet
router.patch('/:id', updateBet)


module.exports = router