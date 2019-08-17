const express = require('express');

const Action = require('./data/helpers/actionModel')

const router = express.Router();

router.get('/', (req, res) => {
    Action.get()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({
            err: error,
            message: "The users information could not be retrieved."
        })
    })
});

module.exports = router;