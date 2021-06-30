import React, { useState } from "react";
import { useHistory } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { updateUser } from "../services/ProfileUpdateService";
import "./AccountInfo.css";

const AccountInfo = ({ activeUser, setActiveUser }) => {
  const [editMode, setEditMode] = useState(false);
  const {
    username,
    firstName,
    lastName,
    department,
    email,
    password,
    typeOfUser,
    avgGrade,
    series,
    degreeType,
  } = activeUser;
  const history = useHistory();

  const isProfessor = () => {
    return typeOfUser === "professor";
  };

  function validate(values) {
    let errors = {};
    if (!values.firstName) {
      errors.firstName = "Enter your first name";
    }
    if (!values.lastName) {
      errors.lastName = "Enter your last name ";
    }
    if (!values.email) {
      errors.email = "Enter a valid email adress";
    }
    if (!values.department) {
      errors.department = "Enter a department";
    }
  }

  function onSubmit(values) {
    console.log(values);

    updateUser(values).then(() => {
      setActiveUser({
        ...activeUser,
        ...values,
      });

      setEditMode(false);
    });
  }

  return (
    // pe on click la edit setEditMode(true)
    <div>
      {!editMode ? (
        <div>
          <h2>Personal Information</h2>{" "}
          <button
            className="btn btn-info d-grid gap-2 col-1 mx-auto"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead></thead>
              <tbody>
                <tr>
                  <th scope="row">First Name</th>
                  <td>{firstName}</td>
                </tr>
                <tr>
                  <th scope="row">Last Name</th>
                  <td>{lastName}</td>
                </tr>
                <tr>
                  <th scope="row">Username</th>
                  <td>{username}</td>
                </tr>
                <tr>
                  <th scope="row">Email Address</th>
                  <td>{email}</td>
                </tr>
                {typeOfUser === "professor" && (
                  <tr>
                    <th scope="row">Department</th>
                    <td>{department}</td>
                  </tr>
                )}

                {typeOfUser === "student" && (
                  <tr>
                    <th scope="row">Series</th>
                    <td>{series}</td>
                  </tr>
                )}

                {typeOfUser === "student" && (
                  <tr>
                    <th scope="row">Average Grade</th>
                    <td>{avgGrade}</td>
                  </tr>
                )}

                {typeOfUser === "student" && (
                  <tr>
                    <th scope="row">Degree Type</th>
                    <td>{degreeType}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Formik
            initialValues={activeUser}
            onSubmit={(values) => onSubmit(values)}
            validate={validate}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
          >
            {(props) => (
              <Form className="col-sm-12 col-md-6 col-lg-4">
                <fieldset className="form-group col-form-label">
                  <label>FirstName: </label>
                  <Field
                    type="text"
                    name="firstName"
                    className="form-control"
                  />
                </fieldset>

                <fieldset className="form-group">
                  <label>LastName: </label>
                  <Field type="text" name="lastName" className="form-control" />
                </fieldset>

                <fieldset className="form-group">
                  <label>Email: </label>
                  <Field type="email" name="email" className="form-control" />
                </fieldset>

                {isProfessor() && (
                  <fieldset className="form-group">
                    <label>Department: </label>
                    <Field
                      type="text"
                      name="department"
                      className="form-control"
                    />
                  </fieldset>
                )}

                {!isProfessor() && (
                  <fieldset className="form-group">
                    <label>Series: </label>
                    <Field type="text" name="series" className="form-control" />
                  </fieldset>
                )}

                {!isProfessor() && (
                  <fieldset className="form-group">
                    <label>Average Grade: {props.values.avgGrade}</label>
                    <br />
                    <Field
                      type="range"
                      className="form-range"
                      name="avgGrade"
                      min="0.0"
                      max="10.0"
                      step="0.1"
                    />

                    {/* <Field type="text" name="avgGrade" className="form-control" /> */}
                  </fieldset>
                )}

                {!isProfessor() && (
                  <fieldset className="row mb-3">
                    <legend className="col-form-label col-sm-2 pt-0">
                      DegreeType
                    </legend>
                    <div className="col-sm-10">
                      <div className="form-check">
                        <Field
                          className="form-check-input"
                          type="radio"
                          name="degreeType"
                          id="gridRadios1"
                          value="Bachelor"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gridRadios1"
                        >
                          Bachelor
                        </label>
                      </div>
                      <div className="form-check">
                        <Field
                          className="form-check-input"
                          type="radio"
                          name="degreeType"
                          id="gridRadios2"
                          value="Master"
                        />
                        <label className="form-check-label" for="gridRadios2">
                          Master
                        </label>
                      </div>
                    </div>
                  </fieldset>
                )}

                <button className="btn btn-success" type="submit">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default AccountInfo;
