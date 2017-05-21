import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Medicine } from '../models/medicine';

export const get = functions.https.onRequest(async (req, res) => {
  let medicine = new Medicine();
  medicine.getById(req.query.id)
    .then(() => {
      res.status(200).send(medicine);
    }).catch(() => {
      res.status(404)
    })
});

export const search = functions.https.onRequest(async (req, res) => {
  let text = req.query.text;
  let medicines: any = [];
  admin.database().ref('medicine/').orderByChild('name')
                                   .startAt(text).endAt(text+"\uf8ff")
                                   .once('value')
                                   .then((snapshots) => {
                                     snapshots.forEach(function(snap: any){
                                      let medicine = new Medicine();
                                      medicine.fill(snap)
                                      medicines.push(medicine);
                                     })
                                     res.status(200).send(medicines);
                                   }).catch(()=>{
                                     res.status(404)
                                   })
})
