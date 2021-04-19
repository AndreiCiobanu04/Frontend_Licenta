import React, { useEffect, useState } from "react";
import { retrieveAssignedProject } from "../../services/ProjectService";

const AssignedProject = ({ activeUser }) => {
  const [coreProject, setCoreProject] = useState("");

  useEffect(() => {
    retrieveAssignedProject(activeUser.id).then((response) =>
      setCoreProject(response.data)
    );
  }, []);

  return (
    <div className="container">
      <div className="card text-dark bg-light">
        <div className="card-body">
          <h4 className="card-title">
            {coreProject.title} <br />
          </h4>
          <h5 className="card-title"> I) General Information</h5>
          {/* <h5 className="blockquote-footer">
            Profesor Coordonator: {projectOwner}
          </h5> */}
          {/* <p>Status: {request.status}</p> */}
          <p className="card-text">{coreProject.description}</p>
          <h7>Minimum Average Grade Required: {coreProject.minGrade}</h7>
          {
            <ul className="">
              Keywords
              {coreProject.keywords != undefined
                ? coreProject.keywords.map((keyword) => (
                    <li className="">{keyword}</li>
                  ))
                : ""}
            </ul>
          }
          <ul className="">
            Skills
            {coreProject.properties != undefined
              ? coreProject.properties.map((skill) => (
                  <li className="">
                    <span>
                      {skill.skillName} : {skill.skillScore}
                    </span>
                  </li>
                ))
              : ""}
          </ul>
          <h5 className="card-title"> II) Stages and Deadlines</h5>
        </div>
      </div>
    </div>
  );
};

export default AssignedProject;
