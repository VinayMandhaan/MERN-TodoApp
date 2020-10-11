import React, { useState, useEffect } from 'react';
import './Signup.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
const Signup = (props) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSignup = async(e) => {
        try{
           await axios({
               method:'post',
               url:'/api/user',
    
               data:{
                   username:username,
                   email:email,
                   password:password
               }
           }).then(res=>{
               console.log(res)
               props.history.push('/login')
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
                <h2 class="text-center"><strong>Create</strong> an account.</h2>
                <div class="form-group">
                    <input class="form-control" type="text" name="username" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div class="form-group">
                    <input class="form-control" type="email" name="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div class="form-group">
                    <input class="form-control" type="password" name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
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
                    <button onClick={()=>onSignup()} class="btn btn-primary btn-block" type="submit">Sign Up</button>
                </div>
                <Link to="/login"><a class="already">You already have an account? Login here.</a></Link>
            </div>
        </div>
    </div>
    )
}

export default Signup