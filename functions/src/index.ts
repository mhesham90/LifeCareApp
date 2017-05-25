import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';
import * as express from 'express';
const app: express.Express = express();
admin.initializeApp(functions.config().firebase);

// import controllers
import PharmacyRouter from './controllers/pharmacyController';

declare module 'express' {
  interface Request {
    user: any
  }
}

// authentication middleware
const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    res.status(403);
    res.send('Unauthorized');
    return;
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
    req.user = decodedIdToken;
    next();
  }).catch(error => {
    res.status(403).send('Unauthorized');
  });
};
//app.use(authenticate);    //...use authenticate middleware


// define routes
app.use("/pharmacy",PharmacyRouter);



// export const districts= DistrictController.getAllDistricts
// export const medicine = MedicineController.get;
// export const search = MedicineController.search;
// export const getPharmacy = PharmacyController.get;

export const api = functions.https.onRequest(app);

// import * as inside from 'point-in-polygon';
// var polygon = [ [ 0, 0 ], [ 2, 0 ], [ 1, 2 ], [ 0, 1 ] ];
//
// console.dir([
//     inside([ 1.5, 0.9 ], polygon),
//     inside([ 4.9, 1.2 ], polygon),
//     inside([ 1.8, 1.1 ], polygon)
// ]);
