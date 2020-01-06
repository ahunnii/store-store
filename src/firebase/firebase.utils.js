import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC4ehi2WjnPuA6-g9jlpZF_toQ33mdlfqk",
    authDomain: "store-store-8188f.firebaseapp.com",
    databaseURL: "https://store-store-8188f.firebaseio.com",
    projectId: "store-store-8188f",
    storageBucket: "store-store-8188f.appspot.com",
    messagingSenderId: "772288864146",
    appId: "1:772288864146:web:3ff1b5540ec59b120b2b4b",
    measurementId: "G-7TCS9MWB3Y"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;
const userRef = firestore.doc(`users/${userAuth.uid}`);

const snapShot = await userRef.get();
    
if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
await userRef.set({
    displayName, email, createdAt, ...additionalData
})
    }catch(error){
console.log('error creating user', error.message)
    }
}
return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;