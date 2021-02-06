import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { requestsForSpecificProject, retrieveProjectById } from '../../services/ProjectService';

import ProjectRequests from './ProjectRequests';





const ProjectDetails = ({activeUser}) => {

    const { id } = useParams();
    const [projectInfo, setProjectInfo] = useState([]);
    const [requests, setRequests] = useState([])

    useEffect(() => {
        retrieveProjectById(id).then(response => {
            setProjectInfo(response.data)
        })
        console.log(projectInfo)
        
    }, [])


    if (!projectInfo)
return <span>Loading...</span>


    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <dl className="row">
                        <dt className="col-sm-3">Title</dt>
                        <dd className="col-sm-9">{projectInfo.title}</dd>


                        <dt className="col-sm-3">Description</dt>
                        <dd className="col-sm-9">{projectInfo.description}</dd>

                        <dt className="col-sm-3">Type of Degree</dt>
                        <dd className="col-sm-9">{projectInfo.degreeType}</dd>

                        <dt className="col-sm-3">Recommended Specialization</dt>
                        <dd className="col-sm-9">{projectInfo.recommendedSpecialization}</dd>

                        <dt className="col-sm-3">Kewords</dt>
                        <dd className="col-sm-9"><p>{ projectInfo.keywords!=undefined ? projectInfo.keywords.map(keyword =>
                            <span>{keyword}, </span>) : ''}</p>
                        </dd>

                        <dt className="col-sm-3">Skills</dt>
                        <dd className="col-sm-9"><p>{projectInfo.properties !=undefined ? projectInfo.properties.map(skill =>
                            <span>{skill.skillName} : {skill.skillScore}  </span>) : ''}</p></dd>
                    </dl>
                </div>

                <div className="col">
                    <ProjectRequests projectId={id}/>
                    

                </div>

            </div>
        </div>
    )
}
export default ProjectDetails;