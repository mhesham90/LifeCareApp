"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
class Medicine {
    constructor() {
    }
    fill(snapshot) {
        this.id = snapshot.key;
        let myObj = snapshot.val();
        this.name = myObj.name;
        this.category = myObj.category;
    }
    getById(id) {
        return new Promise((resolve, reject) => {
            let a = admin.database().ref('medicine/' + id).once("value").then((snapshot) => {
                this.fill(snapshot);
                resolve();
            }, error => reject());
        });
    }
}
exports.Medicine = Medicine;
