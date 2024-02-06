// src/firebase.js

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBq1lU0Hy5Jl-UnbBn2NIrJsTRcDjLVWPk",
    authDomain: "new-app-2bbb7.firebaseapp.com",
    projectId: "new-app-2bbb7",
    storageBucket: "new-app-2bbb7.appspot.com",
    messagingSenderId: "37543498801",
    appId: "1:37543498801:web:4a0afad6cd73a9a0603110",
    measurementId: "G-242P80D5ES"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
