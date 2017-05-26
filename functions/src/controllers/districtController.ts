import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import District from '../models/districts';
import { Router } from 'express';

const districtRouter: Router = Router();

districtRouter.get('/', function(req, res, next) {
  let districts: any = [];
  admin.database().ref('district').orderByChild('name')
                                    .once('value')
                                    .then((snapshots) => {
                                      snapshots.forEach(function(snap: any){
                                         let district = new District();
                                         district.fill(snap)
                                         console.log("district",district)
                                         districts.push(district);
                                     })
                                     res.status(200).send(districts);
                                   }).catch(()=>{
                                     res.status(404)
                                   })
});

districtRouter.get('/:long/:lat', function(req, res, next){
  let long = Number(req.params.long);
  let lat = Number(req.params.lat);
  District.getByCoords(long, lat)
    .then((district: any) => {
        res.status(200).send(district)
    }).catch(() => {
        res.status(404).send("error");
    })
});

export default districtRouter;
