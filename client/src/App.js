import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Project from "./components/Project";

function App() {
  const [project, setProject] = useState({
    name: "",
    description: "",
  });
  const [projects, setProjects] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/projects`)
      .then((res) => {
        setProjects(res.data.projects);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const projectInputChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    axios
      .post("http://localhost:4000/api/projects", project)
      .then((res) => {
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="project">
      <div className="addProject">
        <h2>Add a Project</h2>
        <form className="form" onSubmit={onSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={projectInputChange}
          />
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={project.description}
            onChange={projectInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      {projects.map((project, index) => {
        return (
          <Project
            key={index}
            project={project}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        );
      })}
    </div>
  );
}

export default App;
