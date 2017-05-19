var functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const testModule = require('./controllers/testController');


exports.test = functions.https.onRequest(testModule.test);
