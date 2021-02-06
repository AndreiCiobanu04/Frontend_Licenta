
import React, {useState} from 'react';
import {  useHistory } from 'react-router-dom';
import {executeJwtAuthService, existingUser, registerSuccessful} from './services/LoginService'
import background from '../img/grad.jpg'
import './LoginPage.css'

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
            console.log(state)
        
            

         return (<div className = "background p-5 text-center bg-image img-fluid"
        style= {{backgroundImage: `url(${background})`,
                height: '100vh',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
        }}
>
             {/* <img src={background} className="img"/> */}

             <div className="container-fluid">
	
		<div className="card col-sm-8 col-md-4 col-lg-3 offset-md-4 offset-lg-4">
			<div className="card-header">
				<h3>Sign In</h3>
			</div>
			<div className="card-body">
				<form>
					<div className="input-group form-group">
                        <div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-user"></i></span>
						</div>
						<input type="text" className="form-control" name="username" placeholder="username" onChange={handleChange}/>
						
					</div>
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><i class="fas fa-key"></i></span>
						</div>
						<input type="password" className="form-control" name="password" placeholder="password" onChange={handleChange} />
					</div>
					
					<div className="form-group">
						<input type="button" value="Login" className="btn float-right btn-outline-warning" onClick={loginClicked} />
					</div>
				</form>
			</div>
			<div className="card-footer">
				<div className="d-flex justify-content-center ">
					<a className="forgot" href="#">Forgot your password?</a>
				</div>
			</div>
		</div>
	
</div>
    </div>)

    



}

export default LoginPage;