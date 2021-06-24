import React, { useEffect, useState } from "react";
import {
  assignProjectToStudent,
  deleteRequest,
  getProjectOwner,
  getRequestById,
  updateRequestStatus,
} from "../../services/ProjectService";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router";
const RequestDetailsStud = ({ activeUser }) => {
  const [project, setProject] = useState([]);
  const [projectOwner, setProjectOwner] = useState("");
  const [request, setRequest] = useState("");
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [reload, setReload] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getRequestById(id).then((response) => {
      setRequest(response.data);
      setProject(response.data.project);
      getProjectOwner(response.data.project.professorId).then((r) =>
        setProjectOwner(r.data)
      );
    });
  }, [reload]);

  if (!project) return <span>Loading...</span>;

  return (
    <div className="container">
      <div className="card text-dark bg-light">
        <div className="card-body">
          <h5 className="card-title">{project.title}</h5>
          <h5 className="blockquote-footer">
            Profesor Coordonator: {projectOwner}
          </h5>
          <p>Status: {request.status}</p>
          <p className="card-text">{project.description}</p>
          <p>Minimum Average Grade Required: {project.minGrade}</p>
          {
            <ul className="">
              Keywords
              {project.keywords !== undefined
                ? project.keywords.map((keyword, index) => (
                    <li key={index} className="">
                      {keyword}
                    </li>
                  ))
                : ""}
            </ul>
          }
          <ul className="">
            Skills
            {project.properties !== undefined
              ? project.properties.map((skill, index) => (
                  <li key={index} className="">
                    <span>
                      {skill.skillName} : {skill.skillScore}
                    </span>
                  </li>
                ))
              : ""}
          </ul>
          <p>Scoring: {request.scoring}</p>
        </div>
        <div className="card-footer">
          {request.status === "Accepted By Professor" ? (
            <Button
              className="float-right"
              variant="primary"
              onClick={handleShow}
            >
              Accept
            </Button>
          ) : (
            <div>Request Pending...</div>
          )}
          {request.status === "Accepted By Professor" && (
            <button
              onClick={() =>
                deleteRequest(request.id).then((r) => {
                  setReload(!reload);
                  handleClose();
                  history.push("/studentRequests");
                })
              }
              className="btn btn-danger float-left"
            >
              Decline
            </button>
          )}
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Warning!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              This action cannot be reversed. By clicking ACCEPT you set{" "}
              {project.title} as your Bachelor Project
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning">Decline</Button>
            <Button
              variant="success"
              onClick={() => {
                assignProjectToStudent(project, activeUser).then((r) =>
                  handleClose()
                );
              }}
            >
              Accept
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default RequestDetailsStud;
