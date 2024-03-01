import React from 'react';
import './App.css';
import { useEffect,useContext } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login'
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import { AuthContext, FirebaseContext } from './store/Context';
function App() {
  const {setUser}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)
  useEffect(()=>{
   firebase.auth().onAuthStateChange((user)=>{
    setUser(user)
   })
  })
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
