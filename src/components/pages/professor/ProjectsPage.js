import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  addProject,
  projectsForSpecificProfessor,
  deleteProject,
} from "../../services/ProjectService";
import "./Form.css";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";

const ProjectsPage = ({ activeUser }) => {
  const history = useHistory();
  const [projects, setProjects] = useState([]);
  const [reload, setReload] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);

  function retrieveProjects() {
    projectsForSpecificProfessor(activeUser.id).then((response) => {
      setProjects(response.data);
      setFilteredProjects(response.data);
    });
  }
  console.log(projects);

  useEffect(() => {
    retrieveProjects();
  }, [reload]);

  function addProject() {
    history.push("/projects/-1");
  }

  function updateProjectById(id) {
    history.push(`projects/${id}`);
  }

  function deleteProjectById(projectId) {
    deleteProject(projectId).then((r) => setReload(!reload));
  }

  function filterProjects(year) {
    if (year !== "ALL") {
      setFilteredProjects(projects.filter((elem) => elem.year == year));
    } else {
      setFilteredProjects(projects);
    }
  }

  return (
    <div>
      <h1>Projects List</h1>
      <DropdownButton id="dropdown-item-button" title={"Year"}>
        <Dropdown.Item as="button" onClick={() => filterProjects("2019")}>
          2019
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => filterProjects("2020")}>
          2020
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => filterProjects("2021")}>
          2021
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => filterProjects("ALL")}>
          ALL
        </Dropdown.Item>
      </DropdownButton>
      <div className="container">
        <table className="table table-striped">
          <thead
            className="table-dark"
            style={{
              textAlign: "center",
            }}
          >
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Type of Degree</th>
              <th>Delete</th>
              <th>Update</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.title}</td>
                <td>{project.description}</td>
                <td>{project.degreeType}</td>
                <td>
                  <button
                    className=" btn btn-danger"
                    onClick={() => deleteProjectById(project.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => updateProjectById(project.id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className=" btn btn-dark"
                    onClick={() =>
                      history.push(`/projectDetails/${project.id}`)
                    }
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row">
          <button className="btn btn-info" onClick={addProject}>
            Add a new project
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProjectsPage;
