import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  addStageToProject,
  getStudentById,
  requestsForSpecificProject,
  retrieveProjectById,
} from "../../services/ProjectService";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import emailjs from "emailjs-com";
import ProjectRequests from "./ProjectRequests";

import { DatePickerField } from "../../shared/DatePicker";

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
      if (response.data.student_id) {
        getStudentById(response.data.student_id).then((r) =>
          setStudent(r.data)
        );
      }
    });

    console.log(projectInfo);
  }, [reload]);

  function onSubmit(values, resetForm) {
    addStageToProject(projectInfo.id, values).then((r) => {
      let obj = {
        from_name: "Aplicatie Licenta",
        to_name: student.name,
      };
      setReload(!reload);
    });
    resetForm();
  }

  if (!projectInfo) return <span>Loading...</span>;

  function sendEmail(obj) {}

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
                  ? projectInfo.keywords.map((keyword) => (
                      <span>{keyword}, </span>
                    ))
                  : ""}
              </p>
            </dd>

            <dt className="col-sm-3">Skills</dt>
            <dd className="col-sm-9">
              <p>
                {projectInfo.properties != undefined
                  ? projectInfo.properties.map((skill) => (
                      <span>
                        {skill.skillName} : {skill.skillScore}{" "}
                      </span>
                    ))
                  : ""}
              </p>
            </dd>
          </dl>
        </div>

        <div className="col">
          <ProjectRequests projectId={id} />
        </div>
      </div>
      <div>
        <h5>Stages and Deadlines</h5>
        {deadlines.length > 0 ? (
          <div>
            {deadlines.map((element) => (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{element.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {element.mainTask}
                  </h6>
                  {element.subTasks.length > 0
                    ? element.subTasks.map((subTask) => (
                        <p class="card-text">{subTask}</p>
                      ))
                    : []}
                  <p>Deadline: {element.deadline}</p>
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
          onSubmit={async (values, { resetForm }) =>
            onSubmit(values, resetForm)
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
