import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/firestore'
import { getFirestore } from "firebase/firestore";
import 'firebase/storage'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGnOEXTbMMNDagzYlOlD3iSYZMLZ8sJg4",
  authDomain: "olxclone-7245d.firebaseapp.com",
  projectId: "olxclone-7245d",
  storageBucket: "olxclone-7245d.appspot.com",
  messagingSenderId: "44613372287",
  appId: "1:44613372287:web:04855733cf159db2e8324a",
  measurementId: "G-8CC1M21Z49"
};

export const Firebase = initializeApp(firebaseConfig);
export const auth = getAuth(Firebase);
export const db = getFirestore(Firebase)
export const storage = getStorage(Firebase)




