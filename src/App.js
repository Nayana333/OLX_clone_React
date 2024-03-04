import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Create from './Pages/Create';
import View from './Pages/ViewPost';
import { AuthContext, FirebaseContext } from './store/Context';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const { auth } = useContext(FirebaseContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      userData ? setUser(userData) : setUser(false)
    });

    return () => {
      unsubscribe(); // Unsubscribe from the auth state change listener when component unmounts
    };
  }, [auth]);

  // Render loading message if user state is not yet determined
  if (user === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/" element={<Home user={user} />} />
          <Route path="/view" element={<View />} />
          <Route path="/create" element={!user ? <Navigate to="/login" /> : <Create user={user} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
