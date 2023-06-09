import firebase from 'firebase/compat/app';
import 'firebase/compat/database';


const firebaseConfig = {
    apiKey: "apikey",
    authDomain: "colormatch-34602.firebaseapp.com",
    databaseURL: "database-url",
    projectId: "project-id",
    storageBucket: "storage-bucket",
    messagingSenderId: "id",
    appId: "id",
    measurementId: "id"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;
