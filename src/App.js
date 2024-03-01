import React from 'react';
import './App.css';
import { useEffect,useContext } from 'react';
import Create from './Pages/Create'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login'
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import { AuthContext, FirebaseContext } from './store/Context';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
function App() {
  const {setUser}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)
  useEffect(()=>{
    const auth = getAuth()
    console.log(auth);
   onAuthStateChanged(auth,(err,data)=>{
    console.log(data,err); 
   })
  })
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
