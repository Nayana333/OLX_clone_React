import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAGnOEXTbMMNDagzYlOlD3iSYZMLZ8sJg4",
  authDomain: "olxclone-7245d.firebaseapp.com",
  projectId: "olxclone-7245d",
  storageBucket: "olxclone-7245d.appspot.com",
  messagingSenderId: "44613372287",
  appId: "1:44613372287:web:04855733cf159db2e8324a",
  measurementId: "G-8CC1M21Z49"
};

const Firebase = initializeApp(firebaseConfig);
const auth = getAuth(Firebase);

export  default{ Firebase, auth };



