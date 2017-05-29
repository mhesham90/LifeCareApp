"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const medicine_1 = require("../models/medicine");
const express_1 = require("express");
const medicineRouter = express_1.Router();
medicineRouter.get('/:id', function (req, res, next) {
    let medicine = new medicine_1.default();
    medicine.getById(req.params.id)
        .then(() => {
        res.status(200).send(medicine);
    }).catch(() => {
        res.status(404);
    });
});
medicineRouter.get('/', function (req, res, next) {
    let text = req.query.text.toLowerCase() || '';
    medicine_1.default.searchByName(text)
        .then((medicines) => {
        res.status(200).send(medicines);
    }).catch(() => {
        res.status(404);
    });
});
exports.default = medicineRouter;
