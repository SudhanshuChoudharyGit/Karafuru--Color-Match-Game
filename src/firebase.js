import firebase from 'firebase/compat/app';
import 'firebase/compat/database';


const firebaseConfig = {
    apiKey: "AIzaSyAKjZtFzAUsx9ItTMXwZBn1znSiNvIOAd8",
    authDomain: "colormatch-34602.firebaseapp.com",
    databaseURL: "https://colormatch-34602-default-rtdb.firebaseio.com",
    projectId: "colormatch-34602",
    storageBucket: "colormatch-34602.appspot.com",
    messagingSenderId: "416479585803",
    appId: "1:416479585803:web:acf4ba21f0f9bb3896890e",
    measurementId: "G-NP2LSGLKW8"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;
