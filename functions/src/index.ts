import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);

import * as TestModule from './controllers/testController';


export const test = TestModule.listener;
export const districts= TestModule.getAllDistricts;
