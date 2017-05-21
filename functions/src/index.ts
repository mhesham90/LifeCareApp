import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);

import * as TestModule from './controllers/testController';
import * as MedicineController from './controllers/medicineController';

import * as PharmacyController from './controllers/pharmacyController';

export const test = TestModule.listener;
export const medicine = MedicineController.get;
export const search = MedicineController.search;
export const getPharmacy = PharmacyController.get;


// import * as inside from 'point-in-polygon';
// var polygon = [ [ 0, 0 ], [ 2, 0 ], [ 1, 2 ], [ 0, 1 ] ];
//
// console.dir([
//     inside([ 1.5, 0.9 ], polygon),
//     inside([ 4.9, 1.2 ], polygon),
//     inside([ 1.8, 1.1 ], polygon)
// ]);
