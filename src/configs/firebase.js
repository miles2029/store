import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCyrwIGOub4t5WLveop90Ko8pPa10bDbHQ",
  authDomain: "it-sysarch32-store-maratas.firebaseapp.com",
  projectId: "it-sysarch32-store-maratas",
  storageBucket: "it-sysarch32-store-maratas.appspot.com",
  messagingSenderId: "682140119580",
  appId: "1:682140119580:web:071a54849859ef0050e5d9",
  measurementId: "G-H6WC1PXSCP",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
