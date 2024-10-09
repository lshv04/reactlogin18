// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCqGS_qkDEXeU0CyghgcqthnQKEHangBTk",
    authDomain: "login-2-db4f4.firebaseapp.com",
    projectId: "login-2-db4f4",
    storageBucket: "login-2-db4f4.appspot.com",
    messagingSenderId: "577582930902",
    appId: "1:577582930902:web:c46b3723855430b816e277"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Exporta a autenticação para ser usada no projeto
export const auth = getAuth(app);

