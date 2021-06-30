import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  addStageToProject,
  changeStatusOfStage,
  deleteStageById,
  downloadProjectFile,
  getStudentById,
  requestsForSpecificProject,
  retrieveProjectById,
} from "../../services/ProjectService";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import emailjs from "emailjs-com";
import ProjectRequests from "./ProjectRequests";
import moment from "moment";
import { DatePickerField } from "../../shared/DatePicker";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";

const ProjectDetails = ({ activeUser }) => {
  const { id } = useParams();
  const [projectInfo, setProjectInfo] = useState([]);
  const [requests, setRequests] = useState([]);
  const [reload, setReload] = useState(false);
  const [deadlines, setDeadlines] = useState([]);
  const [student, setStudent] = useState([]);

  useEffect(() => {
    retrieveProjectById(id).then((response) => {
      setProjectInfo(response.data);
      setDeadlines(response.data.stages);
      if (response.data.student && response.data.student.id) {
        console.log(response.data);
        getStudentById(response.data.student.id).then((r) =>
          setStudent(r.data)
        );
      }
    });

    console.log(projectInfo);
  }, [reload]);

  function downloadFile() {
    downloadProjectFile(projectInfo.id).then((blob) => {
      const file = new Blob([blob.data], { type: "application/pdf" });
      // const reader = new FileReader();
      // console.log(reader.readAsArrayBuffer(file));
      // console.log(file.stream());
      const url = window.URL.createObjectURL(file);
      const a = document.createElement("a");
      a.setAttribute("href", url);
      a.setAttribute("download", "Licenta.pdf");
      document.body.appendChild(a);
      a.click();
      a.remove();
    });

    //const url = window.URL.createObjectURL(file);
    //FileSaver.saveAs(file, `Licenta`);
  }

  function onSubmit(values, resetForm) {
    console.log(student);
    addStageToProject(projectInfo.id, values).then((r) => {
      let obj = {
        from_name: "Echipa Aplicatie Licenta",
        to_name: student.firstName + student.lastName,
        to_email: student.email,
        message: `A new stage has been set to your project ${
          projectInfo.title
        }. The deadline is ${moment(values.deadline).format(
          "DD-MM-YYYY"
        )}. More details can be found in your account.`,
      };

      sendEmail(obj);
      setReload(!reload);
    });
    resetForm();
  }

  if (!projectInfo) return <span>Loading...</span>;

  function sendEmail(obj) {
    // emailjs.send(
    //   "service_vlhl7m8",
    //   "template_phgtgke",
    //   obj,
    //   "user_sgOr5gPcnOMGcvNEhY1W9"
    // );
    console.log("se trimite mail");
  }
  function changeStatus(id, status) {
    console.log(status);
    changeStatusOfStage(id, status).then((r) => setReload(!reload));
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <dl className="row">
            <dt className="col-sm-3">Title</dt>
            <dd className="col-sm-9">{projectInfo.title}</dd>

            <dt className="col-sm-3">Description</dt>
            <dd className="col-sm-9">{projectInfo.description}</dd>

            <dt className="col-sm-3">Type of Degree</dt>
            <dd className="col-sm-9">{projectInfo.degreeType}</dd>

            <dt className="col-sm-3">Recommended Specialization</dt>
            <dd className="col-sm-9">
              {projectInfo.recommendedSpecialization}
            </dd>

            <dt className="col-sm-3">Kewords</dt>
            <dd className="col-sm-9">
              <p>
                {projectInfo.keywords != undefined
                  ? projectInfo.keywords.map((keyword, index) => (
                      <span key={index}>{keyword}, </span>
                    ))
                  : ""}
              </p>
            </dd>

            <dt className="col-sm-3">Skills</dt>
            <dd className="col-sm-9">
              <p>
                {projectInfo.properties != undefined
                  ? projectInfo.properties.map((skill, index) => (
                      <span key={index}>
                        {skill.skillName} : {skill.skillScore}{" "}
                      </span>
                    ))
                  : ""}
              </p>
            </dd>
            <button className="btn btn-secondary" onClick={downloadFile}>
              Download Project File
            </button>
          </dl>
        </div>

        <div className="col">
          <ProjectRequests projectId={id} />
        </div>
      </div>
      <div>
        <h5>Stages and Deadlines</h5>
        {deadlines.length > 0 ? (
          <div style={{ marginBottom: "100px" }}>
            {deadlines.map((element, index) => (
              <div key={index} className="card">
                <div className="card-body">
                  <h5 className="card-title">{element.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {element.mainTask}
                  </h6>
                  {element.subTasks.length > 0
                    ? element.subTasks.map((subTask, index1) => (
                        <p key={index1} className="card-text">
                          {subTask}
                        </p>
                      ))
                    : []}
                  <p>
                    Deadline: {moment(element.deadline).format("DD-MM-YYYY")}
                  </p>
                  <DropdownButton
                    id="dropdown-item-button"
                    title={element.status ? element.status : "No status"}
                  >
                    <Dropdown.Item
                      as="button"
                      onClick={() => changeStatus(element.id, "Backlog")}
                    >
                      Backlog
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="button"
                      onClick={() => changeStatus(element.id, "In progress")}
                    >
                      In progress
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="button"
                      onClick={() => changeStatus(element.id, "Done")}
                    >
                      Done
                    </Dropdown.Item>
                  </DropdownButton>

                  <button
                    onClick={() => {
                      deleteStageById(element.id).then((r) =>
                        setReload(!reload)
                      );
                    }}
                    className="btn btn-danger float-right"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          "No deadlines added yet."
        )}
        <Formik
          initialValues={{
            name: "",
            deadline: "",
            mainTask: "",
            subTasks: [],
          }}
          onSubmit={(values, { resetForm }) =>
            onSubmit({ ...values, status: "In progress" }, resetForm)
          }
          enableReinitialize={true}
          validateOnChange={false}
        >
          {(form) => (
            <Form>
              <Field
                className="form-control"
                type="text"
                name="name"
                placeholder="Stage Name"
              />
              <Field
                className="form-control"
                type="text"
                name="mainTask"
                placeholder="Main Task"
              />
              <FieldArray name="subTasks">
                {({ insert, remove, push }) => (
                  <div>
                    {form.values.subTasks.length > 0
                      ? form.values.subTasks.map((subTask, index) => (
                          <div className="row">
                            <div className="col" key={index}>
                              <Field
                                className="form-control"
                                value={subTask}
                                name={`subTasks.${index}`}
                                type="text"
                              />
                            </div>
                            <div className="col">
                              <a
                                className="btn btn-danger"
                                onClick={() => remove(index)}
                              >
                                <i>X</i>
                              </a>{" "}
                            </div>
                          </div>
                        ))
                      : []}
                    <a
                      className="waves-effect waves-light btn btn-primary btn-medium"
                      onClick={() => push("")}
                    >
                      Add SubTask
                    </a>
                  </div>
                )}
              </FieldArray>

              <fieldset>
                <DatePickerField name="deadline" />
              </fieldset>

              <button className="btn btn-success float-left" type="submit">
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default ProjectDetails;
