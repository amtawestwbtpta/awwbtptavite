import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
} from "firebase/auth";
import { createContext, useContext } from "react";
import { getDatabase, set, ref } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { decryptData } from "../modules/encryption";

const enc =
  "U2FsdGVkX18ftWw0zAg6+5HX+utEshyleQ5Y6p+LgU7Kiygm+fkVg8SyswKkceSCCJG6gjkqvgJD0vGm3+oaC0YemRdKGvp19gXfoaMD/By1I0OmnCPaMM/jV2lAykYpQPKHXkOYMPEaYIsMlF6QviQK17RsjkNTkvL7hOWQBjxygvbxDCSMNyjlUzNSVFnV24TdUZH4L6tfWvDY5XjrobICrGpmEb8NnLSnM5uyTWWKFLHw0J3R2YttP9CvEpfpcU0Rn/uu4dDFw3rZjXo9czW4OLYaAIRDTlMAKtb9SqU5SMDG/dThLEWXKMgrkTittSpeRBoy1VAmYAfH6X8JCwoLFCGD6JkIA+evc2vUga0jeBh7IAZp5siT6jVCIwDHlmEuDVQxGxwI1DIOVC3OdrHZGlRwQm48s6hX6TksWB5sNAJsqhsXaTeGS30LzDE1E5gD0eSnnVNDImaB1SpaBQllMZvBmZvndR/Kw8Z8YO5y+gOSHX7EvriOxQb+tMST";
export const firebaseApp = initializeApp(decryptData(enc));
export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
const database = getDatabase(firebaseApp);
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseProvider = (props) => {
  const signupUserWithEmailAndPass = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const putData = (key, data) => {
    set(ref(database, key), data);
  };

  const deleteData = (email) => {
    return deleteUser(email);
  };
  return (
    <FirebaseContext.Provider
      value={{ signupUserWithEmailAndPass, putData, deleteData }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
