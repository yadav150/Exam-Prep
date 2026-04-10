// ✅ Import from CDN (IMPORTANT for GitHub hosting)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔥 Your Firebase config (already correct)
const firebaseConfig = {
  apiKey: "AIzaSyDRcgEc428zLbEDVP8LmN7DPubfwTFhN9U",
  authDomain: "heartspace-app.firebaseapp.com",
  projectId: "heartspace-app",
  storageBucket: "heartspace-app.firebasestorage.app",
  messagingSenderId: "706297788927",
  appId: "1:706297788927:web:a4c15b425eeab93bd70fca",
  measurementId: "G-D6CKEG9BV8"
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🔐 Google Login
window.googleLogin = function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      // Save user in your system format
      const userData = {
        name: user.displayName,
        email: user.email
      };

      localStorage.setItem("loggedInUser", JSON.stringify(userData));

      // Redirect
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
      console.error(error);
    });
};
