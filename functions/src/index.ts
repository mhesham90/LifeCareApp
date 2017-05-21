import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);
import * as TestModule from './controllers/testController';
import * as MedicineController from './controllers/medicineController';
export const test = TestModule.listener;
export const districts= TestModule.getAllDistricts;
export const medicine = MedicineController.get;
export const search = MedicineController.search;

