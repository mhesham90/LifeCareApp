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
    .then((pharmacies:any) => {
      console.log(pharmacies);
      let resArray: any = [];
      pharmacies.forEach((key:any) => {
        let pharmacy = new Pharmacy();
        resArray.push(pharmacy.getById(key))
      })
      let myPharmacies: any = [];
      Promise.all(resArray).then((responses) =>{
        // responses.map(response => {
        //   myPharmacies.push(response)
        // })
        res.status(200).send(responses)
      })
    }).catch(() => {
      res.status(404).send("Error");
    })
  }else{
    District.getByCoords(req.query.gpslong, req.query.gpslat)
    .then((dis: any) => {
      console.log(dis.id);
      district = dis.id;
      Medicine.getPharmaciesByDistrict(medicine_id, district)
      .then((pharmacies:any) => {
        let resArray: any = [];
        pharmacies.forEach((key:any) => {
          let pharmacy = new Pharmacy();
          resArray.push(pharmacy.getById(key))
        })
        let myPharmacies: any = [];
        Promise.all(resArray).then((responses) =>{
          // responses.map(response => {
          //   myPharmacies.push(response)
          // })
          res.status(200).send(responses)
        })
      }).catch(() => {
        res.status(404).send("Error");
      })
    }).catch(() => {
      res.status(404).send("Error");
    })
  }
});

searchRouter.get('/medicines', function(req, res, next) {
  let text = (req.query.text || '').toLowerCase();
  Medicine.searchByName(text)
    .then((medicines) => {
      res.status(200).send(medicines);
    }).catch(() => {
      res.status(404).send("error");
    })
})

export default searchRouter;
