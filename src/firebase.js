import firebase from 'firebase'
import 'firebase/firestore'

var config = {
    apiKey: "AIzaSyD3tV72d4iKQdjPOdFDXeIsyKl5EmWxwF4",
    authDomain: "mini-gsw.firebaseapp.com",
    databaseURL: "https://mini-gsw.firebaseio.com",
    projectId: "mini-gsw",
    storageBucket: "mini-gsw.appspot.com",
    messagingSenderId: "981223853683"
};

firebase.initializeApp(config);

const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});


export default db;
