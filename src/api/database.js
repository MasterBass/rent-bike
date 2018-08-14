import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyBGNoGhsgblmzxBvvgGpxhu6FVLJMM-D7g",
    authDomain: "rent-bike-48a8f.firebaseapp.com",
    databaseURL: "https://rent-bike-48a8f.firebaseio.com/",
    storageBucket: "rent-bike-48a8f.appspot.com"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const apiKey =  "AIzaSyBGNoGhsgblmzxBvvgGpxhu6FVLJMM-D7g";