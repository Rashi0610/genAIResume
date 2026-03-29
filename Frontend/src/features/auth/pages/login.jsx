import React from "react";
import "../auth.form.scss";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Hookss/useAuth.js";
import { useState } from "react";

const Login = () => {
  const { loading, handleLogin } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    await handleLogin({email,password});
    navigate("/");
 };
   
 if(loading){
    return(<main><h1>loading..........</h1></main>)
 }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handlesubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email Id"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
            />
          </div>
          <button className="button primary-button">Login</button>
        </form>
        <p>
          Don't have an account ? <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
