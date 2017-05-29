import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Pharmacy from '../models/pharmacy';
import { Router } from 'express';

const pharmacyRouter: Router = Router();

// pharmacyRouter.get('/:id', function(req, res, next) {
//   let pharmacy = new Pharmacy();
//   pharmacy.getById(req.params.id)
//     .then(() => {
//       res.status(200).send(pharmacy);
//     }).catch(() => {
//       res.status(404)
//     })
// });

export default pharmacyRouter;
