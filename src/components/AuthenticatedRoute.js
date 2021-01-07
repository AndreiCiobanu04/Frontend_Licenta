import React from 'react'
import {isUserLoggedIn} from './services/LoginService'

import {Route, Redirect} from 'react-router-dom'

const AuthenticatedRoute = (props) => {

    if(isUserLoggedIn()) {
    return (
        <Route {...props} />
    )
    }
    else {
        return (<Redirect to="/login" />)
    }

}

    export default AuthenticatedRoute

