import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Medicine } from '../models/medicine';
import { Router } from 'express';

const medicineRouter: Router = Router();

medicineRouter.get('/:id', function(req, res, next) {
  let medicine = new Medicine();
  medicine.getById(req.params.id)
    .then(() => {
      res.status(200).send(medicine);
    }).catch(() => {
      res.status(404)
    })
});


medicineRouter.get('/', function(req, res, next) {
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

export default medicineRouter;
