
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyB9WnscmYxTsSllMXNxiNQLn2FLEV87fIA",
  authDomain: "chatapp-d8b27.firebaseapp.com",
  projectId: "chatapp-d8b27",
  storageBucket: "chatapp-d8b27.appspot.com",
  messagingSenderId: "371866088835",
  appId: "1:371866088835:web:dfddf911431a1078ab72b6",
  measurementId: "G-PVMV9WQL9S"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const provider =  new GoogleAuthProvider()
export const db = getFirestore(app)