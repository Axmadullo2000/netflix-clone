import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCCjqJlbwZoK1-eMtDpPCBIm-W3T5-phQ8",
    authDomain: "netflix-app-83c28.firebaseapp.com",
    projectId: "netflix-app-83c28",
    storageBucket: "netflix-app-83c28.appspot.com",
    messagingSenderId: "808741198267",
    appId: "1:808741198267:web:4b15eae6e2c5c400a2cc9e",
    measurementId: "G-QV3X8N6ZPJ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const auth = getAuth()
export default app
export {db, auth}
