import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import  District  from '../models/districts';


export const getAllDistricts = functions.https.onRequest(async (req, res) => {
  let text = req.query.text;
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
})
