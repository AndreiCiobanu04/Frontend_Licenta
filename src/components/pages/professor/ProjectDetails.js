import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  requestsForSpecificProject,
  retrieveProjectById,
} from "../../services/ProjectService";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";

import ProjectRequests from "./ProjectRequests";

import { DatePickerField } from "../../shared/DatePicker";

const ProjectDetails = ({ activeUser }) => {
  const { id } = useParams();
  const [projectInfo, setProjectInfo] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    retrieveProjectById(id).then((response) => {
      setProjectInfo(response.data);
    });
    console.log(projectInfo);
  }, []);

  function onSubmit(values) {
    console.log(values);
  }

  if (!projectInfo) return <span>Loading...</span>;

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
        <Formik
          initialValues={{
            name: "",
            deadline: "",
            mainTask: "",
            subTasks: [],
          }}
          onSubmit={async (values) => onSubmit(values)}
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
