import { firebaseConfig } from "./config";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const handleUserProfile = async ({ userAuth, additionalData }) => {
  if (!userAuth) return;
  const { uid } = userAuth;

  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const timestamp = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdDate: timestamp,
        ...additionalData,
      });
    } catch (err) {
      // console.log(err);
    }
  }

  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const addProducts = (arr) => {
  const batch = firestore.batch();

  let sizes = [39, 40, 41, 42, 43, 44, 45, 46];

  arr.forEach((doc) => {
    doc.sizes = [];
    let count = Math.floor(Math.random() * sizes.length);
    for (let i = 0; i < count; i++) {
      let x = Math.floor(Math.random() * sizes.length);
      if (doc.sizes.some((el) => parseInt(el) === sizes[x])) {
        i--;
        continue;
      }
      doc.sizes.push(sizes[x]);
    }
    doc.sizes.sort();
    let docRef = firestore.collection("products").doc();
    batch.set(docRef, doc);
  });
  batch.commit();
};
