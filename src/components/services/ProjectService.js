import Axios from "axios"



export const addProject = (project) => {
   return Axios.post("http://localhost:8081/addProject", project)
}
export const retrieveProjectById = (projectId) => {
   return Axios.get(`http://localhost:8081/retrieveProjectById/${projectId}`)
}


export const projectsForSpecificProfessor = (professorId) => {
   return Axios.get(`http://localhost:8081/projectsForSpecificProfessor/${professorId}`)
}

export const updateProject = (project) => {
   return Axios.post('http://localhost:8081/updateProject', project)
}


export const projectsForSpecificSpecialization = (specialization, studentId) => {
 return Axios.get(`http://localhost:8081/projectsForSpecificSpecialization/${specialization}`, {params : {studentId: studentId}})
}

export const getProjectOwner = (professorId) => {
   return Axios.get(`http://localhost:8081/getProjectOwner/${professorId}`)

}


export const addRequest =(request)=> {
   return Axios.post("http://localhost:8081/addRequest", request)

}


export const requestsForSpecificStudent = (studentId) => {
   return Axios.get(`http://localhost:8081/getRequestsForSpecificStudent/${studentId}`)
}

export const requestsForSpecificProfessor= (professorId) => {
   return Axios.get(`http://localhost:8081/getRequestsForSpecificProfessor/${professorId}`)

}

export const getRequestById = (requestId) => {
   return Axios.get(`http://localhost:8081/getRequestById/${requestId}`)
}






