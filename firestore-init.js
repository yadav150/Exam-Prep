// Firestore initialisation using the existing Firebase app instance.
import { auth } from './firebase.js';
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const db = getFirestore(auth.app);
export { db };
