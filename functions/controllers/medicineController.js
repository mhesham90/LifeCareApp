"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const medicine_1 = require("../models/medicine");
exports.get = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    let medicine = new medicine_1.Medicine({ id: req.query.id });
    medicine.fill().then(() => {
        res.status(200).send(medicine);
    }, () => {
        res.status(404);
    });
}));
exports.search = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    let text = req.query.text;
    let medicines = [];
    admin.database().ref('medicine/').orderByChild('name')
        .startAt(text).endAt(text + "\uf8ff")
        .once('value')
        .then((snapshots) => {
        snapshots.forEach(function (child) {
            let output = child.val();
            output['id'] = child.key;
            medicines.push(output);
        });
        console.log(medicines);
        res.status(200).send(medicines);
    }, () => {
        res.status(404);
    });
}));
