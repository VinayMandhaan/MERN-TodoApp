import React, { useEffect, useState } from 'react';
import './Login.css'
import {FaLock} from 'react-icons/fa'
import axios from 'axios'
import {Link} from 'react-router-dom'
const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

  
    const onLogin = async(e) => {
    try{
       await axios({
           method:'post',
           url:'/api/auth',

           data:{
               email:email,
               password:password
           }
       }).then(res=>{
           console.log(res)
           localStorage.setItem('token', res.data.token)
           props.history.push('/task')
       })
    }catch(err){
        console.log(err)
    }

    }

    return(
        <div class="register-photo">
        <div class="form-container">
            <div class="image-holder"></div>
            <div className="form">
                <h2 class="text-center"><strong>Sign In To</strong> Your account.</h2>
                <div class="form-group">
                    <input class="form-control" type="email" placeholder="Email"  onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div class="form-group">
                    <input class="form-control" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div class="form-group">
                    <div class="form-check">
                        <label class="form-check-label">
                            <input class="form-check-input" type="checkbox"/>
                            I agree to the license terms.
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <button onClick={()=>onLogin()} class="btn btn-primary btn-block" type="submit">Sign In</button>
                </div>
                <Link to="/register"><a class="already">Don't have an account? SignUp.</a></Link>
            </div>
        </div>
    </div>
    )
}

export default Login
