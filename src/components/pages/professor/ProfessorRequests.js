import React , {useEffect, useState} from 'react'
import {  useHistory } from 'react-router';
import { requestsForSpecificProfessor } from '../../services/ProjectService';


const ProfessorRequests = ({activeUser}) => { 

    const [requests, setRequests] = useState([]);
    const history = useHistory();

    function getRequests(){
        requestsForSpecificProfessor(activeUser.id).then((response)=> setRequests(response.data))
    }

    useEffect(()=> {
        getRequests()
    }, [])

return(

<div>

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
                            <td><button onClick={()=>history.push(`/request/${request.id}`)} className="btn btn-success">Vezi detalii</button></td>
                        </tr>)}
                </tbody>
            </table>
           </div>



    </div>
)



}


export default ProfessorRequests