/**
 * Firebase Configuration for Haji's Restaurant
 * Replace API_KEY and PROJECT_ID with your Firebase project credentials
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
  getDatabase, 
  ref, 
  set, 
  push, 
  update, 
  onValue, 
  off 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

// ⚠️ REPLACE WITH YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyAHQes4SFyNRbQMS_wBuAfoZ85EBqEGmQA",
  authDomain: "haji-s-restaurant.firebaseapp.com",
  databaseURL: "https://haji-s-restaurant-default-rtdb.firebaseio.com/",
  projectId: "haji-s-restaurant",
  storageBucket: "haji-s-restaurant.firebasestorage.app",
  messagingSenderId: "276986125044",
  appId: "1:276986125044:web:4e8106d8528d1346779ca1",
  measurementId: "G-LP14SXXV2L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Export for use in other modules
export { database, ref, set, push, update, onValue, off };
