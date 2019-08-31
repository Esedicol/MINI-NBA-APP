import firebase from 'firebase'
import 'firebase/firestore'

/*
var config = {
    apiKey: "AIzaSyD3tV72d4iKQdjPOdFDXeIsyKl5EmWxwF4",
    authDomain: "mini-gsw.firebaseapp.com",
    databaseURL: "https://mini-gsw.firebaseio.com",
    projectId: "mini-gsw",
    storageBucket: "mini-gsw.appspot.com",
    messagingSenderId: "981223853683"
};
*/

var config = {
    apiKey: "AIzaSyB2yLJMxVgQXqHilG123lsbCgSS7ugx8jg",
    authDomain: "mini-nba-app-e0356.firebaseapp.com",
    databaseURL: "https://mini-nba-app-e0356.firebaseio.com",
    projectId: "mini-nba-app-e0356",
    storageBucket: "mini-nba-app-e0356.appspot.com",
    messagingSenderId: "283513184036",
    appId: "1:283513184036:web:efb96562f680184f"
};

firebase.initializeApp(config);

const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});


export default db;
