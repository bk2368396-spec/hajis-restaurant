/**
 * Firebase Configuration for Haji's Restaurant
 * Replace API_KEY and PROJECT_ID with your Firebase project credentials
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, push, update, onValue, off, remove, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy, getDocs, setDoc, getDoc, arrayUnion, arrayRemove, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// ⚠️ REPLACE WITH YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyAHQes4SFyNRbQMS_wBuAfoZ85EBqEGmQA",
  authDomain: "haji-s-restaurant.firebaseapp.com",
  // YE LINE LAZMI HONI CHAHIYE (Realtime Database link):
  databaseURL: "https://haji-s-restaurant-default-rtdb.firebaseio.com/",
  projectId: "haji-s-restaurant",
  storageBucket: "haji-s-restaurant.appspot.com",
  messagingSenderId: "276986125044",
  appId: "1:276986125044:web:4e8106d8528d1346779ca1",
  measurementId: "G-LP14SXXV2L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const db = getFirestore(app);
const auth = getAuth(app);
const databaseURL = firebaseConfig.databaseURL;

// Test Firebase connection
try {
  console.log('🔥 Firebase initialized successfully');
  console.log('📊 Realtime Database URL:', databaseURL);
  console.log('🗄️ Firestore initialized for project:', firebaseConfig.projectId);
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
}

// Export for use in other modules
export { 
  database, 
  database as rtdb, 
  db,
  auth,
  ref, 
  set, 
  push, 
  update, 
  onValue, 
  off, 
  remove, 
  get,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  getDocs,
  setDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth
};

// Make available globally for inline scripts/onClick handlers if needed
window.database = database;
window.db = db;
window.firebaseRef = ref;
window.firebaseSet = set;
window.firebasePush = push;
window.firebaseUpdate = update;
window.onValue = onValue;
window.off = off;
window.collection = collection;
window.addDoc = addDoc;
window.updateDoc = updateDoc;
window.deleteDoc = deleteDoc;
window.doc = doc;
window.onSnapshot = onSnapshot;
window.query = query;
window.orderBy = orderBy;
window.getDocs = getDocs;
window.setDoc = setDoc;
window.getDoc = getDoc;
window.arrayUnion = arrayUnion;
window.arrayRemove = arrayRemove;
window.serverTimestamp = serverTimestamp;
window.auth = auth;
window.signInWithEmailAndPassword = signInWithEmailAndPassword;
window.signOut = signOut;
window.onAuthStateChanged = onAuthStateChanged;
window.getAuth = getAuth;

