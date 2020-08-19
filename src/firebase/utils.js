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

export const getProducts = (start, limit) => {
  return new Promise((resolve, reject) => {
    console.log(start);
    const products = [];
    firestore
      .collection("products")
      .orderBy("productId")
      .startAfter(start)
      .limit(limit)
      .get()
      .then((snapshot) => {
        snapshot.forEach((el) => products.push(el.data()));
        resolve({ products, last: snapshot.docs[snapshot.docs.length - 1] });
      })
      .catch((e) => reject(e.message));
  });
};

export const addProducts = (arr) => {
  let sizes = [39, 40, 41, 42, 43, 44, 45, 46];
  console.log("Poczatek: ", arr.length);
  shuffle(arr);

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  const pushBatch = (arr) => {
    const batch = firestore.batch();
    const names = new Set();
    arr.forEach((doc) => {
      doc.sizes = [];
      let count = Math.floor(Math.random() * sizes.length);
      if (count === 0) count = 1;
      for (let i = 0; i < count; i++) {
        let x = Math.floor(Math.random() * sizes.length);
        if (doc.sizes.some((el) => parseInt(el) === sizes[x])) {
          i--;
          continue;
        }
        doc.sizes.push(sizes[x]);
      }
      doc["salePrice"] = parseFloat(
        doc["salePrice"].toString().replace(/(..)$/, ".$1")
      );
      delete doc.lastVisited;
      doc.sizes.sort();
      if (doc.images.length < 1) return;
      if (names.has(doc.productName)) return;
      names.add(doc.productName);
      if (doc.productName.includes("Nike Air")) doc.brand = "Nike Air";
      else if (doc.productName.includes("Jordan")) doc.brand = "Jordan";
      else if (doc.productName.includes("Nike Free")) doc.brand = "Nike Free";
      else if (doc.productName.includes("Nike Air Force"))
        doc.brand = "Nike Air Force";
      else if (doc.productName.includes("Nike SB")) doc.brand = "Nike SB";
      else if (doc.productName.includes("Nike Flex")) doc.brand = "Nike Flex";
      else if (doc.productName.includes("LeBron")) doc.brand = "LeBron";
      let docRef = firestore.collection("products").doc();
      batch.set(docRef, doc);
    });
    batch.commit();
  };

  const arr1 = arr.slice(0, 499);
  const arr2 = arr.slice(499);

  pushBatch(arr1);
  pushBatch(arr2);
};
