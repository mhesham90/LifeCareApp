import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import  Medicine from '../models/medicine';
import Pharmacy from '../models/pharmacy';
import District from '../models/districts';
import { Router } from 'express';

const searchRouter: Router = Router();

searchRouter.get('/pharmacies/:med_id', function(req, res, next) {
  let medicine_id = req.params.med_id;
  let district: any;
  if(req.query.district !== "" && req.query.district !== undefined){
    district = req.query.district;
    Medicine.getPharmaciesByDistrict(medicine_id, district)
    .then((pharmacies) => {
      res.status(200).send(pharmacies);
    }).catch(() => {
      res.status(404).send("Error");
    })
  }else{
    District.getByCoords(req.query.long, req.query.lat)
    .then((dis: any) => {
      console.log(dis.id);
      district = dis.id;
      Medicine.getPharmaciesByDistrict(medicine_id, district)
      .then((pharmacies) => {
        res.status(200).send(pharmacies);
      }).catch(() => {
        res.status(404).send("Error");
      })
    }).catch(() => {
      res.status(404).send("Error");
    })
  }
});

export default searchRouter;
