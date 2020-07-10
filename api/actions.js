const express = require("express");

const router = express.Router();

const Actions = require("../data/helpers/actionModel");
const Projects = require("../data/helpers/projectModel");

router.get("/", (req, res) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json({ actions });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error retrieving the posts",
      });
    });
});

router.post("/project/:id", validateProjectId, validateAction, (req, res) => {
  const id = req.params.id;
  const newAction = { ...req.body, project_id: id };
  Actions.insert(newAction)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error adding the action",
      });
    });
});

router.delete("/:id", (req, res) => {
  Actions.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "The action has been removed" });
      } else {
        res.status(404).json({ message: "The action could not be found" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error removing the action",
      });
    });
});

//middleware
function validateAction(req, res, next) {
  const action = req.body;
  if (!action) {
    res.status(400).json({ message: "missing action data" });
  } else if (!action.notes) {
    res.status(400).json({ message: "missing required name field" });
  } else if (!action.description) {
    res.status(400).json({ message: "missing required description field" });
  } else if (action.description.length > 128) {
    res.status(400).json({ message: "description's character exceeds 128" });
  } else {
    next();
  }
}

function validateProjectId(req, res, next) {
  Projects.get(req.params.id)
    .then((project) => {
      if (project !== null) {
        next();
      } else {
        res.status(400).json({ message: "Invalid project ID" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Can't connect to database", error: err });
    });
}

module.exports = router;
