import React, { useEffect, useState } from "react";
import { projectsForSpecificSpecialization } from "../../services/ProjectService";
import { useHistory } from "react-router";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";

const AvailableProjects = ({ activeUser }) => {
  const [projects, setProjects] = useState([]);
  const [spec, setSpec] = useState("Specialization");

  function showProjects(spec) {
    projectsForSpecificSpecialization(spec, activeUser.id).then((response) =>
      setProjects(response.data)
    );
    setSpec(spec);
  }
  const history = useHistory();

  return (
    <div>
      <h1>Welcome to the project selection page</h1>
      <div>
        Descriere despre cum functioneaza cele 3 metode de alegere a unui
        proiect
      </div>

      <DropdownButton id="dropdown-item-button" title={`${spec}`}>
        <Dropdown.Item as="button" onClick={() => showProjects("MON")}>
          MON
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => showProjects("ELA")}>
          ELA
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => showProjects("CTI")}>
          CTI
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => showProjects("RST")}>
          RST
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => showProjects("TST")}>
          TST
        </Dropdown.Item>
      </DropdownButton>

      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Type of Degree</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.title}</td>
                <td>{project.description}</td>
                <td>{project.degreeType}</td>
                <td>
                  <button
                    onClick={() => history.push(`/project/${project.id}`)}
                    className="btn btn-success"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AvailableProjects;
