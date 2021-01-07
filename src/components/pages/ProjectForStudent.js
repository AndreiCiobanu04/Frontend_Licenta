import React, { useEffect, useState } from 'react'
import { getProjectOwner, retrieveProjectById } from '../services/ProjectService';
import {useParams} from 'react-router-dom';

const ProjectForStudent = () => {
const{id} = useParams();
const [project, setProject] = useState('');
const [projectOwner, setProjectOwner] = useState('');
useEffect(()=> {
   
       retrieveProjectById(id).then((response)=> 
       {setProject(response.data) 
        console.log(project)
        getProjectOwner(response.data.professorId).then((r)=>setProjectOwner(r.data))
        
    
    
    }) 
       
}, [])












return (
    <div>
      
    <div>Title: {project.title}</div>
    <div>Description: {project.description}</div>
    <div>Degree Type: {project.degreeType}</div>
    <div>Titular:{projectOwner} </div>
    <div>RecommendedSpecialization: {project.recommendedSpecialization}</div>











    </div>
)


}



export default ProjectForStudent;