const express = require('express');

const Project = require('./data/helpers/projectModel');
const Action = require('./data/helpers/actionModel')

const router = express.Router();

router.get('/', (req, res) => {
    Project.get()
    .then(project => {
        res.json(project);
    })
    .catch(err => {
        res.status(500).json({
            err: error,
            message: "The project information could not be retrieved."
        })
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Project.getById(id)
    .then(post => {
        if (post) {
            res.json(post)
        } else {
            res.status(400).json({
                err: err,
                message: "The Project with the specified ID does not exist."
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: "The Project information could not be retrieved."
        });
    });  
});

router.delete('/:id', validateProjectId, (req, res) => {
    Project.remove(req.params.id)
    .then(count => {
        if (count > 0) {
          res.status(200).json({ message: 'The Project has been deleted' });
        } else {
          res.status(404).json({ message: 'The Project could not be found' });
        }
      })
      .catch(error => {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error removing the Project',
        });
      });
});

router.put('/:id', validateProjectId, (req, res) => {
    const newProject = req.body

    if (!newProject.name || !newProject.description) {
        res.status(404).json({
            message: "Please provide name and description for the project."
        })
    } else {
        const { id } = req.params;
        Project.update(id, newProject)
        .then((project) => {
                    res.status(201).json(project);
            })
            .catch(err => {
                res.status(500).json({
                        err: err,
                        message: "There was an error while saving the project to the database"
                });
            });
    }
});

function validateProjectId(req, res, next) {
    const { id } = req.params;

    Project.getById(id)
    .then(post => {
        if (post) {
            req.post = post
            next();
        }   else {
            res.status(404).json({ message: 'No Project with given id'})
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: "Error processing request"
        })
    })
};

router.get('/:id/actions', (req, res) => {
    Project.getProjectActions(req.params.id)
  .then(actions => {
    res.status(200).json(actions);
  })
  .catch (error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error getting the actions for the project',
    });
  });
});

module.exports = router;