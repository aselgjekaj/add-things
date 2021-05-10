import firebase from 'firebase'

  var firebaseConfig = {
    apiKey: "AIzaSyCZ4I2r94jeQ1UcAQkwwYbBwvoY5Gtt6Sg",
    authDomain: "simplefirebase-96cd9.firebaseapp.com",
    databaseURL: "https://simplefirebase-96cd9-default-rtdb.firebaseio.com",
    projectId: "simplefirebase-96cd9",
    storageBucket: "simplefirebase-96cd9.appspot.com",
    messagingSenderId: "938177069624",
    appId: "1:938177069624:web:71ef181343fbdea6e81ccd",
    measurementId: "G-P03YT5FNE6"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;