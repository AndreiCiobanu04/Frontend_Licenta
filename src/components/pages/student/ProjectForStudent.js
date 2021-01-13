import React, { useEffect, useState } from 'react'
import { addRequest, getProjectOwner, retrieveProjectById } from '../../services/ProjectService';
import {useParams} from 'react-router-dom';


const ProjectForStudent = ({activeUser}) => {
const{id} = useParams();
const [project, setProject] = useState('');
const [projectOwner, setProjectOwner] = useState('');
const [applied, setApplied] = useState(false)

useEffect(()=> {
   
       retrieveProjectById(id).then((response)=> 
       {setProject(response.data) 
        console.log(project)
        getProjectOwner(response.data.professorId).then((r)=>setProjectOwner(r.data))
        
    
    
    }) 
       
}, [])

function sendRequest(){
    addRequest({
        applicationDate: new Date(),
        student: activeUser,
        project: project,
        status : 'Request made By Student'
    }).then((res) => setApplied(true))
}



return (
    <div>
      
    <div>Title: {project.title}</div>
    <div>Description: {project.description}</div>
    <div>Degree Type: {project.degreeType}</div>
    <div>Titular:{projectOwner} </div>
    <div>RecommendedSpecialization: {project.recommendedSpecialization}</div>
    {!applied ? <button className="btn btn-success" onClick={sendRequest}>Apply For This Project</button>
    : <div>Your request has been sent!</div>}









    </div>
)


}



export default ProjectForStudent;