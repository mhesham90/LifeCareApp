var functions = require('firebase-functions');


const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


module.exports.test = functions.https.onRequest((req, res) => {
  admin.database().ref('/test').push({testKey: 'testValue'}).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref);
  });
});
