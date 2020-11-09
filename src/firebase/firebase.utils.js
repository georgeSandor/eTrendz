import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCkhdISE6jUaJJcoqq4N5xI2fao9fOMsr8",
  authDomain: "trendz-e0443.firebaseapp.com",
  databaseURL: "https://trendz-e0443.firebaseio.com",
  projectId: "trendz-e0443",
  storageBucket: "trendz-e0443.appspot.com",
  messagingSenderId: "47833036086",
  appId: "1:47833036086:web:37baaa8d122563b5ad2f97",
  measurementId: "G-XE7LPQZCJH"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;