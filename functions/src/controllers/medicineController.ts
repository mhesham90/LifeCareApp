import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Medicine from '../models/medicine';
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
  Medicine.searchByName(text)
    .then((medicines) => {
      res.status(200).send(medicines);
    }).catch(() => {
      res.status(404)
    })
})

export default medicineRouter;
