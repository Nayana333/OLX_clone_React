import React, { useState } from 'react';
import './App.css';
import { useEffect, useContext } from 'react';
import Create from './Pages/Create'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login'
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import { AuthContext, FirebaseContext } from './store/Context';
import { onAuthStateChanged } from 'firebase/auth';
import View from './Pages/ViewPost'



function App() {
  const [user, setUser] = useState(null)
  const { auth } = useContext(FirebaseContext)
  useEffect(() => {
    async function checkUser() {
      const session = await onAuthStateChanged(auth, (user) => {
        if(user) {
          setUser(user.displayName)
        }
      })
    }
    checkUser()
  }, [])
  return (
    <div>

      <Router>
        <Routes>
          <Route exact path='/' element={<Home user={user} />} />
          <Route path='/signup' element={user ? <Navigate to='/' /> : <Signup />} />
          <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
          <Route path='/create' element={user ? <Create /> : <Navigate to='/login' />} />
          <Route path='/view' element={<View />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
