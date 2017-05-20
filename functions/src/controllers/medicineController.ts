import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Medicine } from '../models/medicine';

export const get = functions.https.onRequest(async (req, res) => {
  let medicine = new Medicine({id:req.query.id});
  medicine.fill().then(()=>{
    res.status(200).send(medicine);
  },()=>{
    res.status(404);
  })
});

export const search = functions.https.onRequest(async (req, res) => {
  let text = req.query.text;
  let medicines: any = [];
  admin.database().ref('medicine/').orderByChild('name')
                                   .startAt(text).endAt(text+"\uf8ff")
                                   .once('value')
                                   .then((snapshots) => {
                                     snapshots.forEach(function(child: any){
                                       let output = child.val();
                                       output['id'] = child.key;
                                       medicines.push(output);
                                     })
                                     console.log(medicines);
                                     res.status(200).send(medicines);
                                   },()=>{
                                     res.status(404)
                                   })
})
