
import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'; //handling user login

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { Firebase, auth, db } = useContext(FirebaseContext)
  const navigate = useNavigate()
  const handleSignup=()=>{
    navigate('/signup')
  }
  const handleLogin = async (e) => { //this is the function for login 
    e.preventDefault(); 
    

    try {
      signInWithEmailAndPassword(auth, email, password);
      navigate('/')
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // take email 
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // take  password
          />
          <br />
          <br />
          <button type='button' onClick={handleLogin}>Login</button>
        </form>
        <a onClick={handleSignup}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
