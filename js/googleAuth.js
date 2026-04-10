import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔥 Your Firebase config (PASTE YOURS HERE)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
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

      // Save user (same format as your system)
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
    });
};
