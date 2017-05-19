const admin = require('firebase-admin');


module.exports.test = (req,res) => {
    admin.database().ref('/test').push({testKey: 'testValue'}).then(snapshot => {
        res.redirect(303, snapshot.ref);
    });
};