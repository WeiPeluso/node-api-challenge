const express = require("express");
const cors = require("cors");

const server = express();

const projectsRouter = require("./api/projects");
const actionsRouter = require("./api/actions");

server.use(express.json());
server.use(cors());

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Node.JS Sprint Chanllenge</h2>`);
});

module.exports = server;
