import admin from "firebase-admin";
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key,
      }),
      databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
    });
  } catch (error) {
    console.log("Firebase admin initialization error", error.stack);
  }
}
export default admin.firestore();
