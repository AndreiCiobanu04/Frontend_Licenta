import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react'
import { requestsForSpecificStudent } from '../../services/ProjectService';
import {  useHistory } from 'react-router';

const StudentRequests = ({activeUser}) => {

    const [requests, setRequests] = useState([]);
    const history = useHistory();

    function showRequests(){
        requestsForSpecificStudent(activeUser.id).then((response)=> setRequests(response.data))
        
    }

    useEffect(()=> {
        showRequests()
    }, [])






    return(
        <div>
            <h1>Here you can see all projects you applied for!</h1>

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
                    {requests.map(request => 
                        <tr key={request.id}>
                            <td>{request.project.title}</td>
                            <td>{request.project.description}</td>
                            <td>{request.status}</td>
                            <td><button onClick={()=>history.push(`/project/${request.project.id}`)} className="btn btn-success">Vezi detalii</button></td>
                        </tr>)}
                </tbody>
            </table>
           </div>

        </div>
    )
}

export default StudentRequests