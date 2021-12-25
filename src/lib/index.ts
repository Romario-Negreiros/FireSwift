import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, deleteUser } from 'firebase/auth';
import { collection, query, where, getDocs, addDoc, getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, deleteObject, getDownloadURL  } from "firebase/storage";
import { getDatabase, ref as dbRef, set, onValue, update, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_SB,
  messagingSenderId: process.env.REACT_APP_MS_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_M_ID,
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const authentication = {
    auth: getAuth(app),
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updatePassword,
    deleteUser,
};

export const firestoredb = {
  db: getFirestore(app),
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
}

export const realtimedb = {
  db: getDatabase(app),
  dbRef,
  set,
  onValue,
  update,
  remove,
}

export const storage = {
  storage: getStorage(app),
  ref,
  uploadBytesResumable,
  deleteObject,
  getDownloadURL,
}
