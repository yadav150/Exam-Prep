import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDFnxF_v-fXGiZeL_OEMzmKrPdR1PE3KfU",
  authDomain: "auth-project-by-yadav.firebaseapp.com",
  projectId: "auth-project-by-yadav",
  storageBucket: "auth-project-by-yadav.firebasestorage.app",
  messagingSenderId: "351339588417",
  appId: "1:351339588417:web:37475410e0f70a6470cfc0",
  measurementId: "G-788ZZB8CTB"
};

const app = initializeApp(firebaseConfig, "client");
const db = getFirestore(app);

export { db };
