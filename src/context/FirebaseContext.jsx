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
  "U2FsdGVkX1/2P5GuUYSRVDxjBYBFZ8vEGQ52Au0wh17oQ0s11ap14VLMjtqg85bEWbuqz1uE/gT04VlVQHC8iKfBH6qFrxMbn86hCXLy3CkQ65Dw7vK+6PZCVSuvuk6dNxUHzIsS2j5M8IpH9qobdNTZ1ixpZMeHqjjcEevyryCqTA83WrQj7j6Sz/0WwIEImH67Khy2v3dvu6w9BdwflzwWzfuJ/7c8iVdmzWmoqa+E1h9EzUCIRox9BwStJWd/pVICsoB4CvFvEwMdvn1x9rzpfNKc/VsKkkW2cUYmz555VPreHBaNOq8WhWU/VusZf2YiRc7BIWBLtANkb1wrV/lOILeB36VNvpBUWO6WOqYyIer9HQzHQ4xosPkCKJwWSFy1a291qC+PJAtUT1dttH+IUXBVz2M+yWEhxd+X/LuGYaaYvqBx3+hDajeuZ2LDEKY2l32wgXNmh4UGvb/8Pi3YNTBCgUB3Yx9Zf+8Z2wMBm3M5z1KGnfXCY3UTNF2q";
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
