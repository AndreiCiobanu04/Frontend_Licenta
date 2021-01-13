import React, { useEffect, useState } from 'react'
import { projectsForSpecificSpecialization } from '../../services/ProjectService'
import {  useHistory } from 'react-router';



const AvailableProjects = ({activeUser}) => {

    const [projects, setProjects] = useState([]);
function showProjects(specialization){
    projectsForSpecificSpecialization(specialization,activeUser.id ).then((response)=> setProjects(response.data));
}
const history = useHistory();



    return(
        <div>
            <h1>Welcome to the project selection page</h1>
            <div>Descriere despre cum functioneaza cele 3 metode de alegere a unui proiect</div>

            <div>
                <button onClick={()=> showProjects("MON")}>MON</button>
                <button onClick={()=> showProjects("ELA")}>ELA</button>
                <button onClick={()=> showProjects("CTI")}>CTI</button>
                <button onClick={()=> showProjects("RST")}>RST</button>
                <button onClick={()=> showProjects("TST")}>TST</button>
            </div>

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
                            <td><button onClick={()=>history.push(`/project/${project.id}`)} className="btn btn-success">Vezi detalii</button></td>
                        </tr>)}
                </tbody>
            </table>
           </div>
            






















        </div>
    )
}

export default AvailableProjects;