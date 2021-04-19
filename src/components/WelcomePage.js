import Axios from 'axios'
import React, {useState} from 'react'
import {logout} from './services/LoginService'
import axios from 'axios'

const WelcomePage = () => {

    const [message, setMessage] = useState('nu merge');
    function check(){
        Axios.get('http://localhost:8081/test').then(res => setMessage(res.data))
    }





    return (
        <>
        <div>Salut, te ai autentificat cu succes </div>
       
       <button onClick={check}>Check Cors</button>
       <div>{message}</div>
        </>
    )
}

export default WelcomePage