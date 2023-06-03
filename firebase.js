import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCHtZZC4EtjOYFoXOgwM7iNjwRjFeUug6w",
  authDomain: "fir-crudapp-65207.firebaseapp.com",
  databaseURL: "https://fir-crudapp-65207-default-rtdb.firebaseio.com/",
  projectId: "fir-crudapp-65207",
  storageBucket: "fir-crudapp-65207.appspot.com",
  messagingSenderId: "476208411923",
  appId: "1:476208411923:web:8db5af6116d52109e2d6e6"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;

