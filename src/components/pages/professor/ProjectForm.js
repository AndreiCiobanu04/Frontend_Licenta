import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useParams } from "react-router-dom";
import React, { useEffect, useState, Fragment } from "react";
import {
  addProject,
  projectsForSpecificProfessor,
  retrieveProjectById,
  updateProject,
} from "../../services/ProjectService";
import { useHistory } from "react-router";
import { Typeahead } from "react-bootstrap-typeahead";

const ProjectForm = ({ professorId }) => {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const history = useHistory();
  const [keywordsSelected, setKeywordsSelected] = useState([]);

  const options = ["Java", "OOP", "React"];

  function onSubmit(values) {
    console.log(id);
    console.log(keywordsSelected);

    const keywords = keywordsSelected.map((selected) => {
      if (typeof selected === "string") {
        return selected;
      }

      return selected.label;
    });

    if (id === "-1") {
      addProject({ ...values, keywords, professorId }).then(() =>
        history.push("/projects")
      );
    } else {
      updateProject({ ...values, keywords, professorId, id }).then(() =>
        history.push("/projects")
      );
    }
  }

  useEffect(() => {
    retrieveProjectById(id).then((response) => {
      setProject(response.data);
      if (response.data.keywords) {
        setKeywordsSelected(response.data.keywords);
      }
    });
  }, []);
  console.log(project);

  function validate() {}

  return (
    <>
      <div>Project Information for ID - {id}</div>
      <Formik
        initialValues={{
          title: project.title,
          description: project.description,
          degreeType: project.degreeType,
          recommendedSpecialization: project.recommendedSpecialization,
          year: project.year,
          minGrade: project.minGrade,
          maxGrade: project.maxGrade,
          // keywords: project.keywords || [],
          properties: project.properties || [],
        }}
        onSubmit={async (values) => onSubmit(values)}
        validate={validate}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize={true}
      >
        {(form) => (
          <Form>
            {console.log(form.values)}
            <fieldset className="mb-3">
              <Field
                className="form-control"
                type="text"
                name="title"
                placeholder="Title"
              />
            </fieldset>

            <fieldset className="mb-3">
              <Field className="form-control" name="description">
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
                }) => (
                  <div>
                    <textarea
                      className="form-control"
                      type="text"
                      rows="10"
                      placeholder="Description"
                      {...field}
                    />
                    {meta.touched && meta.error && (
                      <div className="error">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </fieldset>

            <label className="form-label">Type of Degree</label>
            <br />
            <div className="form-check form-check-inline">
              <Field
                className="form-check-input"
                type="radio"
                name="degreeType"
                value="Bachelor"
              />
              <label className="form-check-label">Bachelor</label>
            </div>

            <div className="form-check form-check-inline">
              <Field
                className="form-check-input"
                type="radio"
                name="degreeType"
                value="Master"
              />
              <label className="form-check-label">Master</label>
            </div>

            <div>Recommended for the following specialization students</div>

            <div className="form-check form-check-inline">
              <Field
                className="form-check-input"
                type="radio"
                name="recommendedSpecialization"
                value="MON"
              />
              <span>MON</span>
            </div>

            <div className="form-check form-check-inline">
              <Field
                className="form-check-input"
                type="radio"
                name="recommendedSpecialization"
                value="ELA"
              />
              <span>ELA</span>
            </div>

            <div className="form-check form-check-inline">
              <Field
                className="form-check-input"
                type="radio"
                name="recommendedSpecialization"
                value="CTI"
              />
              <span>CTI</span>
            </div>

            <div className="form-check form-check-inline">
              <Field
                className="form-check-input"
                type="radio"
                name="recommendedSpecialization"
                value="RST"
              />
              <span>RST</span>
            </div>

            <div className="form-check form-check-inline">
              <Field
                className="form-check-input"
                type="radio"
                name="recommendedSpecialization"
                value="TST"
              />
              <span>TST</span>
            </div>

            <div>Minimum Average Grade Required</div>

            <Field name="minGrade" type="number" min="0.0" max="10.0" />

            <div>Maximum Average Grade Required</div>
            <Field name="maxGrade" type="number" min="0.0" max="10.0" />

            <FieldArray name="properties">
              {({ insert, remove, push }) => (
                <div>
                  {form.values.properties.length > 0
                    ? form.values.properties.map((property, index) => (
                        <div className="row" key={index}>
                          <div className="col">
                            <label htmlFor={`properties.${index}.skillName`}>
                              SkillName
                            </label>
                            <Field
                              value={property.skillName}
                              name={`properties.${index}.skillName`}
                              type="text"
                            />
                          </div>

                          <div className="col">
                            <label htmlFor={`properties.${index}.skillScore`}>
                              SkillScore
                            </label>
                            <Field
                              value={property.skillScore}
                              name={`properties.${index}.skillScore`}
                              type="number"
                            />
                          </div>

                          <div className="col">
                            <a
                              className="btn-floating btn-small waves-effect waves-light red"
                              onClick={() => remove(index)}
                            >
                              <i className="materials-icons">X</i>
                            </a>
                          </div>
                        </div>
                      ))
                    : []}

                  <a
                    className="waves-effect waves-light btn btn-primary btn-medium"
                    onClick={() => push({ skillName: "", skillScore: "" })}
                  >
                    Add Skill
                  </a>
                </div>
              )}
            </FieldArray>

            <br />

            <button className="btn btn-success float-right" type="submit">
              Save
            </button>
            <br />
          </Form>
        )}
      </Formik>
      <Fragment>
        <label>Keywords</label>
        <Typeahead
          id="typeahead-multi"
          labelkey="keyword"
          multiple
          onChange={setKeywordsSelected}
          options={options}
          placeholder="Choose or type..."
          selected={keywordsSelected}
          allowNew
          newSelectionPrefix="Add new item: "
        />
      </Fragment>
    </>
  );
};

export default ProjectForm;
