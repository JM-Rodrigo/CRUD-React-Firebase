// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDwotBTxxG1yGLxWK4rH77joejzF-ZCJbs",
  authDomain: "crud-react-firebase-59ad2.firebaseapp.com",
  projectId: "crud-react-firebase-59ad2",
  storageBucket: "crud-react-firebase-59ad2.appspot.com",
  messagingSenderId: "592356910531",
  appId: "1:592356910531:web:fd5c81bbfce184d6608976"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)