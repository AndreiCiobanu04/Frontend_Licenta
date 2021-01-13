import {Formik, Form, Field, ErrorMessage, FieldArray}  from 'formik'
import {useParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react'
import { addProject, retrieveProjectById, updateProject } from '../../services/ProjectService';
import {  useHistory } from 'react-router';


const ProjectForm = ({professorId}) => {

const{id} = useParams();
const [project, setProject] = useState({});
const history = useHistory();

function onSubmit(values){
    console.log(id);
    if(id === '-1'){
    addProject({...values, professorId}).then(()=>history.push('/projects'))
    }
    else {
        updateProject({...values, professorId, id}).then(()=> history.push('/projects'))
    }
}

useEffect(()=> {
    retrieveProjectById(id).then(response=> setProject(response.data))
},[])
console.log(project)

function validate(){

}

return(
    <>
    <div>Project Information for ID - {id}</div>
<Formik initialValues={{
    title: project.title,
    description: project.description,
    degreeType: project.degreeType,
    recommendedSpecialization: project.recommendedSpecialization,
    year: project.year,
    minGrade: project.minGrade,
    maxGrade: project.maxGrade,
    keywords: project.keywords || [],
    properties: project.properties || [] ,

    }}
    onSubmit={async (values)=> onSubmit(values)}
    validate={validate}
    validateOnChange={false}
    validateOnBlur={false}
    enableReinitialize={true}
    >
        {
            (form) => (
                <Form>
                    <fieldset className='form-group'>
                        <label>Title</label>
                        <Field type="text" name="title" className="form-control" />
                    </fieldset>

                    <fieldset className='form-group'>
                        <label>Description</label>
                        <Field type="text" name="description" className="form-control" />
                    </fieldset>

                    
                    <div>
                            <div id="my-radio-group-degree">Type of Degree</div>
                        <span role="group1" aria-labelledby="my-radio-group-degree">
                            <label>
                            <Field type="radio" name="degreeType" value="Bachelor" />
                            Bachelor
                            </label>
                            <label>
                            <Field type="radio" name="degreeType" value="Master" />
                            Master
                            </label>
                            
                        </span>

                        </div>

                    <div>
                        <div id="my-radio-group-specialization">Recommended for the following specialization students</div>
                        <div role="group2" aria-labelledby="my-radio-group-specialization">
                            <label>
                            <Field type="radio" name="recommendedSpecialization" value="MON" />
                            MON
                            </label>

                            <label>
                            <Field type="radio" name="recommendedSpecialization" value="ELA" />
                            ELA
                            </label>

                            <label>
                            <Field type="radio" name="recommendedSpecialization" value="CTI" />
                            CTI
                            </label>

                            <label>
                            <Field type="radio" name="recommendedSpecialization" value="RST" />
                            RST
                            </label>

                            <label>
                            <Field type="radio" name="recommendedSpecialization" value="TST" />
                            TST
                            </label>

                            
                        </div>
                        </div>






                                            <div className="col">
                                                <label htmlFor="minGrade">Minimum Average Grade Required</label>
                                                <Field
                                                name="minGrade"
                                                type="number" />
                                            </div>
                            <span>
                            <div className="col">
                                                <label htmlFor="maxGrade">Maximum Average Grade Required</label>
                                                <Field
                                                name="maxGrade"
                                                type="number" />
                                            </div>
                                
                            </span>


                           <FieldArray name="keywords">
                            {({insert, remove, push})=> (
                                <div>
                                    {form.values.keywords.length > 0 && 
                                    form.values.keywords.map((keyword,index)=>(
                                        <div classname="row" key={index}>
                                            <div className="col">
                                                <label htmlFor={`keywords.${index}`}>Keyword</label>
                                                <Field value={keyword}
                                                name={`keywords.${index}`}
                                                type="text" />
                                            </div>
                                            <div className="col">
                                                <button
                                                type="button"
                                                className="secondary"
                                                onClick={() => remove(index)}>X</button>
                                            </div>

                                        </div>
                                    ))}
                                    <button type="button"
                                    className="secondary"
                                    onClick={()=> push('')}

                                >Add Keyword</button>
                                </div>
                            )}

                           </FieldArray>


                            
                            

                        <FieldArray name="properties">
                            {({insert, remove, push}) => (
                                <div>
                                    
                                    {form.values.properties.length > 0 &&
                                    form.values.properties.map((property,index)=>(
                                        <div className="row" key={index}>
                                            <div className="col">
                                                <label htmlFor={`properties.${index}.skillName`}>SkillName</label>
                                                <Field value={property.skillName}
                                                name={`properties.${index}.skillName`}
                                                type="text" />
                                            </div>
                                            
                                            <div className="col">
                                                <label htmlFor={`properties.${index}.skillScore`}>SkillScore</label>
                                                <Field value = {property.skillScore}
                                                name={`properties.${index}.skillScore`}
                                                type="number" />
                                            </div>




                                            <div className="col">
                                                <button
                                                type="button"
                                                className="secondary"
                                                onClick={() => remove(index)}>X</button>
                                            </div>
                                            </div>
                                    ))}

                                    <button type="button"
                                    className="secondary"
                                    onClick={()=> push({skillName: '', skillScore: ''})}
                                >
                                    Add Skill
                                </button>
                                </div>
                            )} 
                        </FieldArray>

                        <button className="btn btn-success" type="submit">Save Project</button>
                        </Form>
            )
        }
</Formik>

</>

)}

export default ProjectForm;