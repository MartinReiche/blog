import {getApps, getApp, initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {initializeAppCheck, ReCaptchaV3Provider} from 'firebase/app-check';

export function getFirebase() {
    if (getApps().length === 0) {
        // Init Firebase
        console.log("Initializing Firebase with:", process.env.GATSBY_FIREBASE_API_KEY);

        const app = initializeApp({
            apiKey: process.env.GATSBY_FIREBASE_API_KEY,
            authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
            projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
            messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
            storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
            appId: process.env.GATSBY_FIREBASE_APP_ID
        });

        // Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
        // key is the counterpart to the secret key you set in the Firebase console.
        if (process.env.GATSBY_FIREBASE_APP_CHECK_DEBUG_MODE === "true") {
            console.log("Iniatializing Firebase AppCheck in Debug Mode");
            // @ts-ignore
            self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
        } else {
            console.log("Iniatializing Firebase AppCheck in Production Mode");
        }

        initializeAppCheck(app, {
            provider: new ReCaptchaV3Provider(process.env.GATSBY_FIREBASE_RECAPTCHA_KEY as string),
            isTokenAutoRefreshEnabled: true
        });

        return {app, auth: getAuth(app), db: getFirestore(app)};
    } else {
        const app = getApp();
        return {app, auth: getAuth(app), db: getFirestore(app)};
    }
}

export default getFirebase;
