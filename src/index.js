import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseContext } from './store/Context';
import Context from './store/Context'
import { Firebase, auth, db, storage } from './firebase/config';
import Post from './store/PostContext';

ReactDOM.render(
  <FirebaseContext.Provider value={{ Firebase, auth, db, storage }}>
    <Context>
      <Post>
        <App />
      </Post>
    </Context>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
