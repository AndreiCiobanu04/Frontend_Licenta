import Axios from "axios"


export const updateUser = (activeUser) => {
    if(activeUser.typeOfUser==='student'){
      return  Axios.post('http://localhost:8081/updateStudentProfile', activeUser)
    }
    
    return Axios.post('http://localhost:8081/updateProfessorProfile', activeUser)
    
}