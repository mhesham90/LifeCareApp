import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'


export const listener = functions.https.onRequest(async (req, res) => {
    admin.database().ref('/test').push({testKey: 'testValue'}).then(snapshot => {
        res.redirect(303, snapshot.ref);
    });
});