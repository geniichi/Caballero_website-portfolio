import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCDRzymlqV2w1MXyKPhGgu7vHSsnGO18_M",
  authDomain: "caballero-webportfolio.firebaseapp.com",
  projectId: "caballero-webportfolio",
  storageBucket: "caballero-webportfolio.appspot.com",
  messagingSenderId: "1089961983915",
  appId: "1:1089961983915:web:4c9f8659f45aff01e3dcee"
};

const app = initializeApp(firebaseConfig);
const Db = getDatabase(app);

export { Db };
