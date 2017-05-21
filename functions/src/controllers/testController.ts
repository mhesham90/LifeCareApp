import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import  District  from '../models/districts'

export const listener = functions.https.onRequest(async (req, res) => {
    admin.database().ref('/test').push({testKey: 'testValue'}).then(snapshot => {
        res.redirect(303, snapshot.ref);
    });
});

export const getAllDistricts = functions.https.onRequest((req, res) => {
     var dist = new District();
     dist.getAllDistricts().then((ref: any) => {
        res.redirect(303, ref);
     })
    
});