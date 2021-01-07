
import React, {useState} from 'react';
import {  useHistory } from 'react-router-dom';
import {executeJwtAuthService, existingUser, registerSuccessful} from './services/LoginService'

const LoginPage = ({setActiveUser}) => {

        
        const history = useHistory();
        const [state, setState] = useState({
            username: "",
            password: "",
            hasLoginFailed: false,
            showSuccessMessage: false

        });
        

        function handleChange(e){
            //console.log(state);
            setState({
                ...state,
                [e.target.name] : e.target.value          
                 });
                 

        }

        function loginClicked () { 
        
            executeJwtAuthService(state.username, state.password)
            .then( (response) => { 
                 registerSuccessful(state.username, response.data.token);
                history.push(`/welcome`)
                }
                ).catch( () => { 
                    setState({
                        ...state,
                        hasLoginFailed: true,
                        showSuccessMessage: false});

                })

                existingUser(state.username).then(res =>
                    {
                    setActiveUser(res.data)
                    localStorage.setItem("user", JSON.stringify(res.data));
                //    console.log(setActiveUser)
                 //   localStorage.setItem("user", res.data.typeOfUser)
                }).catch( () => {setState({
                    ...state,
                    hasLoginFailed: true
                })})
            }
 
        

         return (<div>
             <h1>Login</h1>
             <div className="container">
             {state.showSuccessMessage && 
             <div>Login Successful</div> }
             {state.hasLoginFailed &&
             <div className="alert alert-warning">Invalid Credentials</div>}
            UserName: <input type="text" name="username" value={state.username} onChange={handleChange} />
            Password: <input type="password" name="password" value={state.password} onChange={handleChange}/>
            <button className="btn btn-succes button" onClick={loginClicked}>Login</button>    
            </div>
    </div>)

    



}

export default LoginPage;