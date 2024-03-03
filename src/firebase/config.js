import { initializeApp } from "firebase/app";//  its a app instances,responsible for database and storage
import { getAuth } from "firebase/auth";
import 'firebase/firestore'
import { getFirestore } from "firebase/firestore";//used to get the Cloud Firestore service for the initialized Firebase app.
import 'firebase/storage'
import { getStorage } from "firebase/storage";// get cloud services

const firebaseConfig = {
  apiKey: "AIzaSyAGnOEXTbMMNDagzYlOlD3iSYZMLZ8sJg4",
  authDomain: "olxclone-7245d.firebaseapp.com",
  projectId: "olxclone-7245d",
  storageBucket: "olxclone-7245d.appspot.com",
  messagingSenderId: "44613372287",
  appId: "1:44613372287:web:04855733cf159db2e8324a",
  measurementId: "G-8CC1M21Z49"
};


export const Firebase = initializeApp(firebaseConfig); //firebase services
export const auth = getAuth(Firebase);// auth services
export const db = getFirestore(Firebase)// firestore services
export const storage = getStorage(Firebase)//cloud storage 




