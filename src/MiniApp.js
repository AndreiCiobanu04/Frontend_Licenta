import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import WelcomePage from './components/WelcomePage'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import Header from './components/Header'
import AccountInfo from './components/pages/AccountInfo'
import ProjectForm from './components/pages/ProjectForm'
import ProjectsPage from './components/pages/ProjectsPage'
import {setupAxiosInterceptors} from './components/services/LoginService'
import AvailableProjects from './components/pages/AvailableProjects'
import ProjectForStudent from './components/pages/ProjectForStudent'

const MiniApp = () => {

    const [activeUser, setActiveUser] = useState( JSON.parse(localStorage.getItem("user")) ||
        {id: 'null',
        username: 'null',
        firstName: 'null',
        lastName : 'null',
        role:'null',
        password: 'null',
        typeOfUser: 'null'}
    )
    console.log(activeUser);

    useEffect(()=> {
        setupAxiosInterceptors(localStorage.getItem("token"))

    }, [])




    return (
        <div className="miniapp">
            <Router>
                <>
                <Header activeUser={activeUser} setActiveUser={setActiveUser} />
                <Switch>
                    <Route exact path="/login">
                        <LoginPage setActiveUser={setActiveUser} />
                    </Route>

                    <AuthenticatedRoute path="/welcome" >
                        <WelcomePage  />
                        </AuthenticatedRoute>

                    <AuthenticatedRoute path="/accountInfo">
                        <AccountInfo activeUser={activeUser} setActiveUser={setActiveUser} />
                        </AuthenticatedRoute>  
                        
                        <AuthenticatedRoute exact path="/projects">
                            <ProjectsPage activeUser={activeUser} />
                        </AuthenticatedRoute>


                     <AuthenticatedRoute path="/projects/:id">
                        <ProjectForm professorId={activeUser.id}/>
                        </AuthenticatedRoute>   

                     <AuthenticatedRoute path="/availableProjects">
                         <AvailableProjects />
                         </AuthenticatedRoute>   

                     <AuthenticatedRoute path="/project/:id">
                         <ProjectForStudent />
                         </AuthenticatedRoute>       

                </Switch>









                </>
            </Router>





        </div>
    )
}


export default MiniApp;