import { setNestedObjectValues } from 'formik';
import React, {useEffect, useState} from 'react'
import {  useHistory } from 'react-router';
import { addProject, projectsForSpecificProfessor } from '../../services/ProjectService';


const ProjectsPage = ({activeUser}) => {
const history = useHistory();
const [projects, setProjects] = useState([]);



function retrieveProjects(){
    projectsForSpecificProfessor(activeUser.id).then(
        response => setProjects(response.data)
)
}
console.log(projects)

useEffect(()=> {
    retrieveProjects()
}, [])

function addProject(){
    history.push('/projects/-1')
}

function updateProjectById(id){
    history.push(`projects/${id}`)
}


return (
    <div>
        
        <h1>Projects List</h1>
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Type of Degree</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => 
                        <tr key={project.id}>
                            <td>{project.title}</td>
                            <td>{project.description}</td>
                            <td>{project.degreeType}</td>
                            <td><button className="btn btn-warning">Delete</button></td>
                            <td><button className="btn btn-success"onClick={()=> updateProjectById(project.id)}>Update</button></td>
                        </tr>)}
                </tbody>
            </table>
            <div className="row">
                <button className="btn btn-success" onClick={addProject} >Add a new project</button>
            </div>
        </div>
        
        
        </div>
    
)










}
export default ProjectsPage;