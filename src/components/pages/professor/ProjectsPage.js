
import React, {useEffect, useState} from 'react'
import {  useHistory } from 'react-router';
import { addProject, projectsForSpecificProfessor } from '../../services/ProjectService';
import './Form.css'

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
            <table className="table table-striped">
                <thead className="table-dark" style={{
                    textAlign:'center'
                }}>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Type of Degree</th>
                        <th>Delete</th>
                        <th>Update</th>
                        <th>Details</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => 
                        <tr key={project.id}>
                            <td>{project.id}</td>
                            <td>{project.title}</td>
                            <td>{project.description}</td>
                            <td>{project.degreeType}</td>
                            <td><button className=" btn btn-danger">Delete</button></td>
                            <td><button className="btn btn-success" onClick={()=> updateProjectById(project.id)}>Update</button></td>
                            <td><button className=" btn btn-dark"   onClick={()=> history.push(`/projectDetails/${project.id}`)}>Details</button></td>
                        </tr>)}
                </tbody>
            </table>
            <div className="row">
                <button className="btn btn-info" onClick={addProject} >Add a new project</button>
            </div>
        </div>
        
        
        </div>
    
)
}
export default ProjectsPage;