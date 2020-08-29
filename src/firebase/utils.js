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

export const getProducts = (options) => {
  return new Promise((resolve, reject) => {
    const { start, limit, sizes, brands } = options.filters;
    const products = [];
    const productsRef = firestore.collection("products");

    if (brands.length > 0) {
      productsRef
        .where("brand", "in", brands)
        .orderBy("productId")
        .startAfter(start)
        .limit(limit)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            if (sizes.length > 0) {
              if (
                doc.data().sizes.some((size) => sizes.some((el) => el === size))
              )
                products.push(doc.data());
            } else products.push(doc.data());
          });
          resolve({ products, last: snapshot.docs[snapshot.docs.length - 1] });
        })
        .catch((e) => reject(e.message));
    } else if (sizes.length > 0) {
      productsRef
        .where("sizes", "array-contains-any", sizes)
        .orderBy("productId")
        .startAfter(start)
        .limit(limit)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => products.push(doc.data()));
          resolve({ products, last: snapshot.docs[snapshot.docs.length - 1] });
        })
        .catch((e) => reject(e.message));
    }

    if (sizes.length === 0 && brands.length === 0)
      productsRef
        .orderBy("productId")
        .startAfter(start)
        .limit(limit)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => products.push(doc.data()));
          resolve({ products, last: snapshot.docs[snapshot.docs.length - 1] });
        })
        .catch((e) => reject(e.message));
  });
};

export const getProduct = (id) => {
  return new Promise((resolve, reject) => {
    const productsRef = firestore.collection("products");

    productsRef
      .where("productId", "==", id)
      .limit(1)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) resolve(snapshot.docs[0].data());
        else resolve(false);
      })
      .catch((e) => console.log(e));
  });
};

export const getTrading = () => {
  return new Promise((resolve, reject) => {
    const productsRef = firestore.collection("products");
    const products = [];

    productsRef
      .where("brand", "==", "Nike")
      .limit(7)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => products.push(doc.data()));
        resolve(products);
      })
      .catch((e) => console.log(e));
  });
};

export const getTopProducts = () => {
  return new Promise((resolve, reject) => {
    const productsRef = firestore.collection("products");
    const products = [];

    productsRef
      .orderBy("rating", "desc")
      .limit(7)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => products.push(doc.data()));
        resolve(products);
      })
      .catch((e) => console.log(e));
  });
};

export const checkOutUser = (order, userId) => {
  const ordersRef = firestore
    .collection("users")
    .doc(userId)
    .collection("orders")
    .doc();

  const timestamp = new Date();
  const { cart, payment, cartTotal } = order;

  try {
    ordersRef.set({
      cart,
      payment,
      createdDate: timestamp,
      cartTotal,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getOrders = (userCredentials) => {
  return new Promise((resolve, reject) => {
    const orders = [];
    const { id } = userCredentials;
    const ordersRef = firestore
      .collection("users")
      .doc(id)
      .collection("orders");

    ordersRef.get().then((snapshot) => {
      snapshot.forEach((doc) => orders.push({ id: doc.id, ...doc.data() }));
      if (orders.length > 0) resolve(orders);
      else reject(orders);
    });
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
