import firebase from "firebase";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const FIREBASE_CONFIG = publicRuntimeConfig.FIREBASE_CONFIG;

if (process.browser && !firebase.apps.length) {
  try {
    firebase.initializeApp(JSON.parse(FIREBASE_CONFIG));
  } catch (error) {
    console.log("Firebase initialization error", error.stack);
  }
}

export default firebase;
