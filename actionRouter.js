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

router.post("/", validateAction,  (req, res) => {
    const action = req.body;

    Action.insert(action)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(err => {
            res.status(500).json({
                error:
                    "There was an error while saving the action to the database"
            });
        });
});

function validateAction(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: "missing user data" });
    } else if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({ message: "missing required project_id, description or notes field" });
    } else {
        next();
    }
};

module.exports = router;