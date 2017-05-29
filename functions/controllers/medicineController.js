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
        res.status(404).send("not found");
    });
});
exports.default = medicineRouter;
