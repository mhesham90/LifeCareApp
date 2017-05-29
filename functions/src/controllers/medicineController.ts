import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Medicine from '../models/medicine';
import { Router } from 'express';

const medicineRouter: Router = Router();
//algolia indexing
// var algoliasearch = require('algoliasearch');
// const algolia = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
// const algolia = algoliasearch(functions.config().algolia.app_id, functions.config().algolia.api_key);
// const index = algolia.initIndex('medicines');
// medicineRouter.get('/import', function(req, res, next) {

    ////////////
    // var medicinesRef = admin.database().ref("/medicines");
    // medicinesRef.once('value', initialImport);
    // function initialImport(dataSnapshot: any) {
    //   // Array of data to index
    //   let objectsToIndex: any = [];
    //   // Get all objects
    //   let values = dataSnapshot.val();
    //   // Process each child Firebase object
    //   dataSnapshot.forEach((function(childSnapshot: any) {
    //     // get the key and data from the snapshot
    //     var childKey = childSnapshot.key;
    //     var childData = childSnapshot.val();
    //     // Specify Algolia's objectID using the Firebase object key
    //     childData.objectID = childKey;
    //     // Add object for indexing
    //     objectsToIndex.push(childData);
    //   }))
      // Add or update new objects
    // index.saveObjects([{"objectID": "1","name": "yasser mohsen"},{"objectID": "2", "name": "ahmed mohey"}], function(err, content) {
    //   if (err) {
    //     console.log("algolia errrror");
    //     throw err;
    //   }
    //   console.log('Firebase -> Algolia import done');
    //   process.exit(0);
    // });
    // }
// })
// medicineRouter.get('/algolia', function(req, res, next) {
//     index.search('moh', function(err: any, content: any) {
//       if(err){
//         console.log(err)
//         res.status(404).send('errrrror')
//       }
//       console.log(content);
//       res.status(200).send(content);
//     });
// })
// medicineRouter.get('/all', function(req, res, next) {
//   let size = Number(req.query.size);
//   // let page = Number(req.params.page);
//   Medicine.getAll(size)
//     .then((medicines) => {
//       res.status(200).send(medicines);
//     }).catch(() => {
//       res.status(404)
//     })
// })

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
  let text = req.query.text.toLowerCase() || '';
  Medicine.searchByName(text)
    .then((medicines) => {
      res.status(200).send(medicines);
    }).catch(() => {
      res.status(404)
    })
})

export default medicineRouter;
