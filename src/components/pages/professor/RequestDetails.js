import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import { getRequestById } from '../../services/ProjectService';
import {  useHistory } from 'react-router';


const RequestDetails = () => {

    const{id} = useParams();
    const history = useHistory();
    const [requestInfo, setRequestInfo] = useState()

    useEffect(()=> {
        getRequestById(id).then((response) => setRequestInfo(response.data))
    } ,[])


    function sendResponseToStudent(){
        
    }


if (!requestInfo)
return <span>Loading...</span>



    return(
        <div>

            <div>Request Information</div>
            <div>Project Title:{requestInfo.project.title} </div>
            <div>Description:{requestInfo.project.description} </div>
            <div>Student:{requestInfo.student.firstName} {requestInfo.student.lastName} </div>
            <div>Type of Degree:{requestInfo.project.degreeType} </div>
            <div> 
                <button className="btn btn-success">Accept Student</button>
                <button className="btn btn-danger">Decline Student</button>
            </div>
            



        </div>
    )
}




export default RequestDetails