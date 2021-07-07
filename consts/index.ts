import { ServiceAccount } from "firebase-admin";

const firebaseServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

export const FIREBASE_SERVICE_ACCOUNT = JSON.parse(firebaseServiceAccount) as ServiceAccount;
