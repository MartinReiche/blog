import * as admin from 'firebase-admin';

const DATABASE_URL = 'https://bemona-eb711.firebaseio.com';
const STORAGE_BUCKET = 'bemona-eb711.appspot.com';

export function initFirebase() {
  if (admin.apps.length === 0) {
    // Init Firebase
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: DATABASE_URL,
      storageBucket: STORAGE_BUCKET
    });
    return admin;
  }
  return admin;
}

export default initFirebase;
