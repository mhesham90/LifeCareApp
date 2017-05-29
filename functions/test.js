// var inside = require('point-in-polygon');
// var polygon = [[0,0],[2,0],[3,1],[2.5,2],[1,4]];
//
// if(inside([1,1], [[0,0],[2,0],[3,1],[2.5,2],[1,4]])){
//     console.log('trueeeeeeeeee');
//   }
//algolia indexing
var algoliasearch = require('algoliasearch');
// const algolia = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
// const algolia = algoliasearch(functions.config().algolia.app_id, functions.config().algolia.api_key);
var algolia = algoliasearch('CSG0J0TRHU', '963029a9004067cb210cc619dbf843d5');
// medicineRouter.get('/import', function(req, res, next) {
var index = algolia.initIndex('medicines');
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
index.search('mohse', function(err, content) {
  console.log(JSON.stringify(content.hits));
  // res.status(200).send(content.hits);
});
    // }
// })
