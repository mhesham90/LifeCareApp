import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';
import * as express from 'express';
const app: express.Express = express();
admin.initializeApp(functions.config().firebase);

// import controllers
import PharmacyRouter from './controllers/pharmacyController';
import DistrictRouter from './controllers/districtController';
import MidicineRouter from './controllers/medicineController';
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
app.use("/medicine",MidicineRouter);
app.use("/district",DistrictRouter);


export const api = functions.https.onRequest(app);
