// ✅ Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXdYWgyHMAzslfxiUI5yFodzJnEnj3ibs",
  authDomain: "diciplan-c8cab.firebaseapp.com",
  projectId: "diciplan-c8cab",
  storageBucket: "diciplan-c8cab.firebasestorage.app",
  messagingSenderId: "134732086536",
  appId: "1:134732086536:web:a82f73bd321354ab58c0bd",
  measurementId: "G-2NSL6HGZJQ"
};


// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore (THIS IS IMPORTANT!)
export const db = getFirestore(app);  // ✅ Ensuring Firestore is correctly initialized

