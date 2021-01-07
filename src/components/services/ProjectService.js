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


export const projectsForSpecificSpecialization = (specialization) => {
 return Axios.get(`http://localhost:8081/projectsForSpecificSpecialization/${specialization}`)
}

export const getProjectOwner = (professorId) => {
   return Axios.get(`http://localhost:8081/getProjectOwner/${professorId}`)

}

