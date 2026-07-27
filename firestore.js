import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// Your Firebase config (same as firebase.js – no duplicate app creation)
const firebaseConfig = {
  apiKey: "AIzaSyDFnxF_v-fXGiZeL_OEMzmKrPdR1PE3KfU",
  authDomain: "auth-project-by-yadav.firebaseapp.com",
  projectId: "auth-project-by-yadav",
  storageBucket: "auth-project-by-yadav.firebasestorage.app",
  messagingSenderId: "351339588417",
  appId: "1:351339588417:web:37475410e0f70a6470cfc0",
  measurementId: "G-788ZZB8CTB"
};

// Initialize Firebase app (only if not already initialized)
const app = initializeApp(firebaseConfig, "client"); // named instance to avoid conflict
const db = getFirestore(app);

export { db };
