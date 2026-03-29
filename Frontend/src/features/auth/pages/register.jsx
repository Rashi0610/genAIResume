import React, { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import { useAuth } from "../Hookss/useAuth";

const Register = () => {
    const {loading , handleRegister} = useAuth();
    const navigate = useNavigate();
    const [username,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handlesubmit = async(e)=>{
        e.preventDefault();
        await handleRegister(username,email,password);
        navigate("/");
    }
    
    if(loading){
        return (<h1>LOADING........</h1>)
    }

    return(
        <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handlesubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input onChange={(e)=>{setUserName(e.target.value)}}
                    type="text" id="username" name="username" placeholder="Enter username"/> 
                </div> 
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e)=>{setEmail(e.target.value)}}
                    type="email" id="email" name="email" placeholder="Enter Email Id"/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} 
                    type="password" id="password" name="password" placeholder="Enter password"/> 
                </div>
                
                <button className="button primary-button">Register</button>
            </form>
            <p>Already have an account ? <Link to={"/login"}>Login</Link></p>
        </div>
       </main>
    )
}

export default Register;