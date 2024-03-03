// import React, { useState, useContext } from 'react';
// import Logo from '../../olx-logo.png';
// import './Signup.css';
// import { FirebaseContext } from '../../store/Context';
// import { useNavigate } from 'react-router-dom';
// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { addDoc, collection } from 'firebase/firestore';

// export default function Signup() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const firebaseApp = useContext(FirebaseContext);

//   const validateEmail = (email) => {
//     // Regular expression to validate email format
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(String(email).toLowerCase());
//   };

//   const validatePhone = (phone) => {
//     // Regular expression to validate phone number format (10 digits)
//     const re = /^\d{10}$/;
//     return re.test(String(phone));
//   };

//   const validatePassword = (password) => {
//     // Password length should be at least 6 characters
//     return password.length >= 6;
//   };

//   const validateUsername = (username) => {
//     // Username should contain only letters
//     const re = /^[a-zA-Z]+$/;
//     return re.test(String(username));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateEmail(email)) {
//       setError('Please enter a valid email address.');
//       return;
//     } else if (!validatePhone(phone)) {
//       setError('Please enter a valid 10-digit phone number.');
//       return;
//     } else if (!validatePassword(password)) {
//       setError('Password must be at least 6 characters long.');
//       return;
//     } else if (!validateUsername(username)) {
//       setError('Username should contain only letters.');
//       return;
//     }

//     const userCredentials = await createUserWithEmailAndPassword(firebaseApp.auth, email, password)
//       .catch((error) => {
//         setError(error.message);
//       });

//     if (userCredentials) {
//       await updateProfile(userCredentials.user, { displayName: username });
      
//       await addDoc(collection(firebaseApp.db,'users'), {
//         id: userCredentials.user.uid,
//         name: username,
//         phone: phone,
//         password: password
//       });

//       // Redirect or do something else upon successful signup
//       navigate('/success');
//     }
//   };

//   return (
//     <div>
//       <div className="signupParentDiv">
//         <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="fname">Username</label>
//           <br />
//           <input
//             className="input"
//             type="text"
//             value={username}
//             onChange={(e) => {
//               setUsername(e.target.value);
//               setError('');
//             }}
//             id="fname"
//             name="name"
//             placeholder="Enter your username"
//           />
//           <br />
//           <label htmlFor="fname">Email</label>
//           <br />
//           <input
//             className="input"
//             type="email"
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value);
//               setError('');
//             }}
//             id="fname"
//             name="email"
//             placeholder="Enter your email"
//           />
//           <br />
//           <label htmlFor="lname">Phone</label>
//           <br />
//           <input
//             className="input"
//             type="number"
//             value={phone}
//             onChange={(e) => {
//               setPhone(e.target.value);
//               setError('');
//             }}
//             id="lname"
//             name="phone"
//             placeholder="Enter your phone number"
//           />
//           <br />
//           <label htmlFor="lname">Password</label>
//           <br />
//           <input
//             className="input"
//             type="password"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//               setError('');
//             }}
//             id="lname"
//             name="password"
//             placeholder="Enter your password"
//           />
//           <br />
//           {error && <p className="error">{error}</p>}
//           <br />
//           <button type="submit">Signup</button>
//         </form>
//         <a href="/login">Login</a>
//       </div>
//     </div>
//   );
// }


import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection, getFirestore, setDoc } from 'firebase/firestore'; // adddoc fn is used to create new doc in firebase,
//collection : reference b to a firestore collection

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const firebaseApp = useContext(FirebaseContext);
  const handleLogin=()=>{
    navigate('/login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userCredentails = await createUserWithEmailAndPassword(firebaseApp.auth, email, password)
    updateProfile(userCredentails.user, { displayName: username })
    const doc = addDoc(collection(firebaseApp.db,'users'),{
      id:userCredentails.user.uid,
      name:username,
      phone:phone,
      password:password
    })
    console.log(doc);
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={handleLogin}>Login</a>
      </div>
    </div>
  );
}


