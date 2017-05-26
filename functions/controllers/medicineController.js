"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const medicine_1 = require("../models/medicine");
const express_1 = require("express");
const medicineRouter = express_1.Router();
medicineRouter.get('/:id', function (req, res, next) {
    let medicine = new medicine_1.Medicine();
    medicine.getById(req.params.id)
        .then(() => {
        res.status(200).send(medicine);
    }).catch(() => {
        res.status(404);
    });
});
medicineRouter.get('/', function (req, res, next) {
    let text = req.query.text;
    let medicines = [];
    admin.database().ref('medicine/').orderByChild('name')
        .startAt(text).endAt(text + "\uf8ff")
        .once('value')
        .then((snapshots) => {
        snapshots.forEach(function (snap) {
            let medicine = new medicine_1.Medicine();
            medicine.fill(snap);
            medicines.push(medicine);
        });
        res.status(200).send(medicines);
    }).catch(() => {
        res.status(404);
    });
});
exports.default = medicineRouter;
