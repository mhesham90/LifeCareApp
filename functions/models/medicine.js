"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
class Medicine {
    constructor(fields) {
        if (fields)
            Object.assign(this, fields);
    }
    fill() {
        return new Promise((resolve, reject) => {
            if (!this.id)
                reject();
            let a = admin.database().ref('medicine/' + this.id).once("value").then((snapshot) => {
                let myMedicine = snapshot.val();
                this.name = myMedicine.name;
                this.category = myMedicine.category;
                resolve();
            }, error => reject());
        });
    }
}
exports.Medicine = Medicine;
