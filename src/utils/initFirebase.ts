import {getApps, getApp, initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

export function initFirebase() {
    if (getApps().length === 0) {
        // Init Firebase
        const app = initializeApp({
            apiKey: process.env.GATSBY_FIREBASE_API_KEY,
            authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
            projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
            messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
            storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
            appId: process.env.GATSBY_FIREBASE_APP_ID
        });
        return {app, auth: getAuth(app), db: getFirestore(app)};
    } else {
        const app = getApp();
        return {app, auth: getAuth(app), db: getFirestore(app)};
    }
}

export default initFirebase;
