// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBx4xQMHf82tRRd7nCEfe8W44s-r1_baDU',
  authDomain: 'clone-v1-2de01.firebaseapp.com',
  projectId: 'clone-v1-2de01',
  storageBucket: 'clone-v1-2de01.appspot.com',
  messagingSenderId: '562522327431',
  appId: '1:562522327431:web:e495cba6a2b708afd7eb22',
  measurementId: 'G-QV041P651P',
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
