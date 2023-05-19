import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
// const firebaseConfig = {
//   apiKey: "AIzaSyCfxyekcsmQZJdfuMRZc-98swvZOQlQXHM",
//   authDomain: "hotel-manager-1539e.firebaseapp.com",
//   projectId: "hotel-manager-1539e",
//   storageBucket: "hotel-manager-1539e.appspot.com",
//   messagingSenderId: "124974073673",
//   appId: "1:124974073673:web:46cac670fa76cc6d93bc98",
//   measurementId: "G-RT0L2YZ0NV",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCG3-eQmgLGHPPlefU_Ft7ohWbfH6mZYKA",
  authDomain: "hotel-management-4a379.firebaseapp.com",
  projectId: "hotel-management-4a379",
  storageBucket: "hotel-management-4a379.appspot.com",
  messagingSenderId: "590358523478",
  appId: "1:590358523478:web:75b11b80dc18f90bbe55f7",
  measurementId: "G-0HSHJ0L467",
};
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
export const storage = getStorage(app);
