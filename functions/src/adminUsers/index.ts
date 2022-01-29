import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const addAdminRightsToUser = functions.firestore
    .document('admins/{id}')
    .onCreate(async (snap) => {
        try {
            // get admin record from firestore
            const userRecord = snap.data();
            if (!userRecord) return null;
            // retrieve user with email in admin record
            const user = await admin.auth().getUserByEmail(userRecord.email)
            if (!user) return null;
            // set custom user claim 'admin' true
            await admin.auth().setCustomUserClaims(user.uid, {admin: true});
            return null;
        } catch (error) {
            console.error(error);
            return false;
        }
    });

export const removeAdminRightsFromUser = functions.firestore
    .document('admins/{id}')
    .onDelete(async (snap) => {
        try {
            // get admin record from firestore
            const userRecord = snap.data();
            if (!userRecord) return null;
            // retrieve user with email in admin record
            const user = await admin.auth().getUserByEmail(userRecord.email)
            if (!user) return null;
            // set custom user claim 'admin' undefined
            await admin.auth().setCustomUserClaims(user.uid, {admin: undefined});
            return null;
        } catch (error) {
            console.error(error);
            return false;
        }
    });
