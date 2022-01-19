import * as functions from 'firebase-functions';
import sendWelcomeAdminMail from './sendWelcomeAdminMail';
import { initFirebase } from '../utils';

const admin = initFirebase();

function createNewUser({
  email,
  uid,
  displayName,
  password
}: {
  email: string;
  uid: string;
  displayName: string;
  password: string;
}) {
  return admin
    .auth()
    .createUser({
      uid,
      email,
      emailVerified: true,
      displayName,
      password
    })
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', userRecord.uid);
      return userRecord;
    });
}

function setAdminClaims(user: any) {
  return admin.auth().setCustomUserClaims(user.uid, {
    admin: true
  });
}

function createTemporaryPassword() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

export const createAdminUser = functions.firestore
  .document('admins/{id}')
  .onCreate(snap => {
    const userRecord = snap.data();
    if (!userRecord) return null;
    const password = createTemporaryPassword();

    return createNewUser({
      uid: snap.id,
      email: userRecord.email,
      displayName: userRecord.displayName,
      password
    })
      .then(setAdminClaims)
      .then(() => {
        console.log('Successfully added admin user');
        return sendWelcomeAdminMail({
          name: userRecord.name,
          email: userRecord.email,
          password
        });
      })
      .then(() => console.log('Successfully sent welcome mail'))
      .catch(error => {
        console.error(error);
        return false;
      });
  });

export const deleteAdminUser = functions.firestore
  .document('admins/{id}')
  .onDelete(snap => {
    const userRecord = snap.data();
    if (!userRecord) return null;
    return admin
      .auth()
      .deleteUser(snap.id)
      .then(function() {
        console.log('Successfully deleted admin user');
      })
      .catch(function(error) {
        console.log('Error deleting user:', error);
      });
  });
