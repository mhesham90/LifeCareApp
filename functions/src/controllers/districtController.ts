import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import District from '../models/districts';
import { Router } from 'express';
// import inside from 'point-in-polygon';
// var inside = require('point-in-polygon');

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
  District.getByLongLat(long, lat)
    .then((district: any) => {
        res.send(200).send(district)
    }).catch(() => {
        res.status(404).send("error");
    })
  // res.status(404).send(d);
  // District.getAllDistricts()
  //   .then((districts: any) => {
  //     districts.forEach((dist: any) => {
  //       let pointsString = dist.points || "";
  //       let myPoints = pointsString.split(",");
  //       let pointsList: any = [];
  //       for (var i=0; i<myPoints.length; i+=2)
  //           pointsList.push(myPoints.slice(i,i+2));
  //       pointsList = pointsList.map((arr: any) => arr.map(Number))
  //       if(inside([ long, lat ], pointsList)){
  //           res.status(200).send(dist)
  //       }
  //     })
  //     res.status(404).send('Not Found');
  //   }).catch(() => {
  //     res.status(404).send("error");
  //   })
});

export default districtRouter;
