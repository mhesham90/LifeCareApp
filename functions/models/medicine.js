"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const pharmacy_1 = require("./pharmacy");
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
                console.log(snapshot.exists());
                if (snapshot.exists()) {
                    this.fill(snapshot);
                    resolve();
                }
                else {
                    reject();
                }
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
    static getPharmaciesByDistrict(id, district) {
        let pharmacies = [];
        return new Promise((resolve, reject) => {
            admin.database().ref("medicine/" + id + "/pharmacies").orderByChild('district')
                .equalTo(district).once('value')
                .then((snapshots) => {
                console.log(snapshots.val());
                snapshots.forEach(function (snapshot) {
                    if (snapshot.val().quantity > 5) {
                        let pharmacy = new pharmacy_1.default();
                        pharmacy.fill(snapshot);
                        pharmacies.push(pharmacy);
                    }
                });
                resolve(pharmacies);
            }, error => reject());
        });
    }
}
exports.default = Medicine;
