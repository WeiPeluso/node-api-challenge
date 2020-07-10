import React, { useState, useEffect } from "react";
import axios from "axios";
import Action from "./Action";

const Project = (props) => {
  const [actions, setActions] = useState([]);
  const [editProject, setEditProject] = useState({
    name: props.project.name,
    description: props.project.description,
  });
  const [editToggle, setEditToggle] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/projects/actions/${props.project.id}`)
      .then((res) => {
        setActions(res.data.actions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.refresh]);

  const deleteProjectHandler = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:4000/api/projects/${props.project.id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        props.setRefresh(!props.refresh);
      });
  };

  const editProjectHandler = (e) => {
    e.preventDefault();
    setEditToggle(true);
  };

  const projectEditChange = (e) => {
    e.preventDefault();
    setEditProject({
      ...editProject,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:4000/api/projects/${props.project.id}`,
        editProject
      )
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setEditToggle(false);
        props.setRefresh(!props.refresh);
      });
  };
  const cancelEdit = (e) => {
    setEditToggle(false);
  };
  return (
    <>
      {editToggle ? (
        <>
          <form className="form" onSubmit={onSubmit}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editProject.name}
              onChange={projectEditChange}
            />

            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={editProject.description}
              onChange={projectEditChange}
            />
            <button onClick={cancelEdit}>Cancel</button>
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <>
          <h2>Name:</h2>
          <p>{props.project.name}</p>
          <h2>Description:</h2>
          <p>{props.project.description}</p>
          <h3>Actions</h3>
          {actions.length !== 0 &&
            actions.map((action, index) => {
              return (
                <Action
                  key={index}
                  action={action}
                  refresh={props.refresh}
                  setRefresh={props.setRefresh}
                />
              );
            })}
        </>
      )}
      <button onClick={deleteProjectHandler}>Delete Project</button>
      <button onClick={editProjectHandler}>Edit Project</button>
    </>
  );
};

export default Project;
