import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';


import { useHistory } from 'react-router';
import { requestsForSpecificProject, updateRequestStatus } from '../../services/ProjectService';


const ProjectRequests = ({ projectId }) => {

    const [requests, setRequests] = useState([]);
    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    useEffect(() => {
        requestsForSpecificProject(projectId).then(response => {
            setRequests(response.data)
            console.log(requests)
        })
    }, [show])

    return (

        <div>

            <div className="container">
                <table className="table table-responsive">
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Status</th>
                            <th>See Profile</th>

                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(request =>
                            <tr key={request.id}>
                                <td>{request.student.firstName} {request.student.lastName}</td>
                                <td>{request.status}</td>
                                <td> <Button variant="primary" onClick={handleShow}>
                                 See Profile
                                            </Button>
                                            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Student Profile : {request.student.firstName} {request.student.lastName} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
         <div>Series: {request.student.series}</div>
         <div>Average Grade: {request.student.avgGrade}</div>
         <div>Email: {request.student.email}</div>
         <div>Application Date: {moment(request.applicationDate).format('YYYY-MM-DD')} </div>
            


        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => {
                updateRequestStatus(request.id, 'Declined By Professor').then(r => handleClose())
          }}>
            Decline
          </Button>
          <Button variant="success" onClick={() => {
              
              updateRequestStatus(request.id, 'Accepted By Professor').then(
                  r => handleClose()
              )
              
        
        }}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
                                </td>

                               
                            </tr>)}
                    </tbody>
                </table>
            </div>

            
     

     
            </div>
    )



}


export default ProjectRequests