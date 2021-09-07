import dotenv from 'dotenv';
import firebase from 'firebase';

dotenv.config();

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID
  });
}

const database = firebase.firestore();
database.settings({ 
  ignoreUndefinedProperties: true,
  merge: true 
});

export default database;
