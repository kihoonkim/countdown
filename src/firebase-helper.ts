import {initializeApp} from 'firebase/app';
import {getAnalytics} from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA5WDMQHCSF4ZZM2rny7eXOdyeL7qNsml8",
  authDomain: "countdown-223bb.firebaseapp.com",
  databaseURL: "https://countdown-223bb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "countdown-223bb",
  storageBucket: "countdown-223bb.firebasestorage.app",
  messagingSenderId: "714873959965",
  appId: "1:714873959965:web:f9f42debc4f5a692f038f4",
  measurementId: "G-JFDXC8ZHVE"
};

const app = initializeApp(firebaseConfig);
export function initFirebase() {
  getAnalytics(app);
}

const db = getDatabase();
export function getDB() {
  return db;
}
