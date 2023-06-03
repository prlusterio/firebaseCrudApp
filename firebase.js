import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDG12zk3NnHzbLZU6K0ZE-30iEPAhIieX0",
  authDomain: "hello-firebase-bf77e.firebaseapp.com",
  databaseURL: "https://fir-crud-384ce-default-rtdb.firebaseio.com/",
  projectId: "hello-firebase-bf77e",
  storageBucket: "hello-firebase-bf77e.appspot.com",
  messagingSenderId: "646208853359",
  appId: "1:646208853359:web:3d964a7d50262e6156849a"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;