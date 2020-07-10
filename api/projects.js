const express = require("express");

const router = express.Router();

const Projects = require("../data/helpers/projectModel");
const { route } = require("./actions");

router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json({ projects });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error retrieving the posts",
      });
    });
});

router.get("/actions/:id", (req, res) => {
  const id = req.params.id;
  Projects.getProjectActions(id)
    .then((actions) => {
      res.status(200).json({ actions });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error retrieving the actions",
      });
    });
});

router.post("/", validateProject, (req, res) => {
  const newProject = req.body;
  Projects.insert(newProject)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error adding the project",
      });
    });
});

router.put("/:id", validateProject, (req, res) => {
  const updatedProject = req.body;
  Projects.update(req.params.id, updatedProject)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(500).json({
        message: "The project information could not be modified.",
      });
    });
});

router.delete("/:id", (req, res) => {
  Projects.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "The project has been removed" });
      } else {
        res.status(404).json({ message: "The project could not be found" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error removing the project",
      });
    });
});

//middleware
function validateProject(req, res, next) {
  const project = req.body;
  if (!project) {
    res.status(400).json({ message: "missing project data" });
  } else if (!project.name) {
    res.status(400).json({ message: "missing required name field" });
  } else if (!project.description) {
    res.status(400).json({ message: "missing required description field" });
  } else {
    next();
  }
}

module.exports = router;
