import React, {useState} from 'react'
import {  useHistory } from 'react-router';
import {Formik, Form, Field, ErrorMessage}  from 'formik'
import { updateUser } from '../services/ProfileUpdateService'





const AccountInfo = ({activeUser, setActiveUser}) => {
    
    const [editMode, setEditMode] = useState(false)
    const {username, firstName, lastName, department, email, password, typeOfUser} = activeUser
    const history = useHistory();
    

    const isProfessor = () =>{
        return typeOfUser==='professor'
        }

    

    function validate(values){
        let errors = {}
        if(!values.firstName){
            errors.firstName = 'Enter your first name'
        }
        if(!values.lastName){
            errors.lastName = 'Enter your last name '
        }
        if(!values.email){
            errors.email = 'Enter a valid email adress'
            }
        if(!values.department){
            errors.department= 'Enter a department'
        }
            

    }

    function onSubmit(values){
        console.log(values)
        setActiveUser({
            ...activeUser,
           ...values
        })

        updateUser(activeUser).then(()=>{
            setEditMode(false)
        })
        

    }


    return(
    
    <div>
        {!editMode ? <div>
        <h1>Complete your personal information</h1>
        <div>Username: <span>{username}</span></div>
        <div>FirstName: <span>{firstName}</span></div>
        <div>LastName: <span>{lastName}</span></div>
      {isProfessor() &&  <div>Department: <span>{department}</span></div> }
        <div>Email:<span>{email}</span></div>
        <div>Password:<span>{password}</span></div>
        <div onClick={() => setEditMode(true)}>Edit</div>
        </div>   :  
    
        <Formik initialValues={
            activeUser
            }
            onSubmit={(values) => onSubmit(values)}
            validate={validate}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
            >
                {
                    (props) => (
                        <Form>
                            <fieldset className="form-group">
                                <label>FirstName: </label>
                                <Field type="text" name="firstName" className="form-control" />
                            </fieldset>

                            <fieldset className="form-group">
                                <label>LastName: </label>
                                <Field type="text" name="lastName" className="form-control" />
                            </fieldset>

                            <fieldset className="form-group">
                                <label>Email: </label>
                                <Field type="email" name="email" className="form-control" />
                            </fieldset>


                          {isProfessor() &&  <fieldset className="form-group">
                                <label>Department: </label>
                                <Field type="text" name="department" className="form-control" />
                            </fieldset> }

                            {!isProfessor && <fieldset className="form-group">
                                <label>Series: </label>
                                <Field type="text" name="series" className="form-control" />
                            </fieldset>}

                            { !isProfessor && <fieldset className="form-group">
                                <label>Average Grade: </label>
                                <Field type="text" name="avgGrade" className="form-control" />
                            </fieldset>}

                           {!isProfessor && <div>
                            <div id="my-radio-group">Type of Degree</div>
                        <div role="group" aria-labelledby="my-radio-group">
                            <label>
                            <Field type="radio" name="degreeType" value="Bachelor" />
                            Bachelor
                            </label>
                            <label>
                            <Field type="radio" name="degreeType" value="Master" />
                            Master
                            </label>
                            
                        </div>
                            </div>}
                        

                            

                            <button className="btn btn-success" type="submit">Save</button>


                            </Form>
                    )
                }

        </Formik> }

        </div>
    )

}

export default AccountInfo