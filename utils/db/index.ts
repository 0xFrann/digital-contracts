import admin from "firebase-admin";
import { FIREBASE_SERVICE_ACCOUNT } from "../../consts";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT),
      databaseURL: `https://${FIREBASE_SERVICE_ACCOUNT.project_id}.firebaseio.com`,
    });
  } catch (error) {
    console.log("Firebase admin initialization error", error.stack);
  }
}
export default admin.firestore();
