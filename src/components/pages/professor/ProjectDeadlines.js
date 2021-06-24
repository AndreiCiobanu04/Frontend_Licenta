import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";

const ProjectDeadlines = () => {
  return (
    <div>
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
  );
};

export default ProjectDeadlines;
