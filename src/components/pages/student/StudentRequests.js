import React, { useEffect, useState } from "react";
import { requestsForSpecificStudent } from "../../services/ProjectService";
import { useHistory } from "react-router";

const StudentRequests = ({ activeUser }) => {
  const [requests, setRequests] = useState([]);
  const history = useHistory();

  function showRequests() {
    requestsForSpecificStudent(activeUser.id).then((response) =>
      setRequests(response.data)
    );
  }

  useEffect(() => {
    showRequests();
  }, []);

  if (!requests) return <div>Loading...</div>;

  console.log(requests);

  return (
    <div>
      <h1>Here you can see all projects you applied for!</h1>

      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Specialization</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.project.title}</td>
                <td>{request.project.recommendedSpecialization}</td>
                <td
                  style={{ color: request.project.student ? "red" : "black" }}
                >
                  {request.project.student
                    ? "Allocated to another student"
                    : request.status}
                </td>
                <td>
                  <button
                    onClick={() =>
                      history.push(`/requestDetailsStud/${request.id}`)
                    }
                    className="btn btn-success"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentRequests;
