"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
var FirebasePaginator = require('firebase-paginator');
let options = {
    pageSize: 2,
    finite: true
};
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
    static searchByName(name) {
        let medicines = [];
        return new Promise((resolve, reject) => {
            let a = admin.database().ref('medicine/').orderByChild('name')
                .startAt(name).endAt(name + "\uf8ff")
                .once('value')
                .then((snapshots) => {
                snapshots.forEach(function (snap) {
                    let medicine = new Medicine();
                    medicine.fill(snap);
                    medicines.push(medicine);
                });
                resolve(medicines);
            }, error => reject());
        });
    }
}
exports.default = Medicine;
