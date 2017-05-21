import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Pharmacy } from '../models/pharmacy';

export const get = functions.https.onRequest(async (req, res) => {
  let pharmacy = new Pharmacy();
  pharmacy.getById(req.query.id)
    .then(() => {
      res.status(200).send(pharmacy);
    }).catch(() => {
      res.status(404)
    })
});
