import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import { getRequestById } from '../../services/ProjectService';
import {  useHistory } from 'react-router';


const RequestDetails = () => {

    const{id} = useParams();
    const history = useHistory();
    const [request, setRequest] = useState()

    useEffect(()=> {
        getRequestById(id).then((response) => setRequest(response.data))
    } ,[])


    function sendResponseToStudent(){
        
    }


if (!request)
return <span>Loading...</span>



    return(
        <div>

            <div>Request Information</div>
            <div>Project Title:{request.project.title} </div>
            <div>Description:{request.project.description} </div>
            <div>Student:{request.student.firstName} {request.student.lastName} </div>
            <div>Type of Degree:{request.project.degreeType} </div>
            <div> 
                <button className="btn btn-success">Accept Student</button>
                <button className="btn btn-danger">Decline Student</button>
            </div>
            



        </div>
    )
}




export default RequestDetails