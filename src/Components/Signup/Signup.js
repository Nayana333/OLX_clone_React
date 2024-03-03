import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const firebaseApp = useContext(FirebaseContext);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    // Username validation
    if (!/^[a-zA-Z]*$/.test(username)) {
      setUsernameError('Username should contain letters only');
      isValid = false;
    } else {
      setUsernameError('');
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email address is invalid');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Phone validation
    if (!/^\d{10}$/.test(phone)) {
      setPhoneError('Phone number should contain 10 digits');
      isValid = false;
    } else {
      setPhoneError('');
    }

    // Password validation
    if (password.length < 6) {
      setPasswordError('Password should be at least 6 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      try {
        const userCredentials = await createUserWithEmailAndPassword(firebaseApp.auth, email, password);
        await updateProfile(userCredentials.user, { displayName: username });
        await addDoc(collection(firebaseApp.db, 'users'), {
          id: userCredentials.user.uid,
          name: username,
          phone: phone,
          password: password,
        });
        console.log('User signed up successfully');
      } catch (error) {
        console.error('Error signing up:', error.message);
      }
    }
  };

  const handleUsernameChange = (value) => {
    setUsername(value);
    if (usernameError && /^[a-zA-Z]*$/.test(value)) {
      setUsernameError('');
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    if (emailError && /\S+@\S+\.\S+/.test(value)) {
      setEmailError('');
    }
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    if (phoneError && /^\d{10}$/.test(value)) {
      setPhoneError('');
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (passwordError && value.length >= 6) {
      setPasswordError('');
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className={`input ${usernameError ? 'error' : ''}`}
            type="text"
            value={username}
            onChange={(e) => handleUsernameChange(e.target.value)}
            id="username"
            name="username"
          />
          <br />
          <p className="error-message">{usernameError}</p>

          <label htmlFor="email">Email</label>
          <br />
          <input
            className={`input ${emailError ? 'error' : ''}`}
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            id="email"
            name="email"
          />
          <br />
          <p className="error-message">{emailError}</p>

          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className={`input ${phoneError ? 'error' : ''}`}
            type="text"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            id="phone"
            name="phone"
          />
          <br />
          <p className="error-message">{phoneError}</p>

          <label htmlFor="password">Password</label>
          <br />
          <input
            className={`input ${passwordError ? 'error' : ''}`}
            type="password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            id="password"
            name="password"
          />
          <br />
          <p className="error-message">{passwordError}</p>

          <button>Signup</button>
        </form>
        <a onClick={handleLogin}>Login</a>
      </div>
    </div>
  );
}
