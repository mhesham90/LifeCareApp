import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
// var FirebasePaginator = require('firebase-paginator');
// let options = {
//   pageSize: 2,
//   finite: true
// };
import Pharmacy from './pharmacy';

export default class Medicine{
  uid: string;
  name: string;
  imageURL: string;
  category: string;   //medicines or accessories
  type: string;       //pills, ..
  num_units: number;
  unit_price: number;
  pharmacies:{};

  constructor() {

  }

  fill(snapshot: any){
    Object.assign(this, snapshot.val());
    this.uid = snapshot.key;
  }

  getById(id: any){
      return new Promise((resolve, reject)=>{
        let a = admin.database().ref('medicine/'+id).once("value").then((snapshot) => {
          console.log(snapshot.exists())
          if(snapshot.exists()){
            this.fill(snapshot)
            resolve()
          }else{
            reject()
          }
        },error => reject());
      })
  }
  static searchByName(name: any){
    let medicines: any = [];
    return new Promise((resolve, reject)=>{
      let a = admin.database().ref('medicine/').orderByChild('name')
                                               .startAt(name).endAt(name+"\uf8ff")
                                               .once('value')
                                               .then((snapshots) => {
                                                   snapshots.forEach(function(snap: any){
                                                      let medicine = new Medicine();
                                                      medicine.fill(snap)
                                                      medicines.push(medicine);
                                                   })
                                                  resolve(medicines)
                                              }, error => reject());
                                          })
  }
  // static getAll(size: number){
  //   let medicines: any = [];
  //     return new Promise((resolve, reject)=>{
  //       // let myRef = admin.database().ref('medicine/');
  //       // let paginator = new FirebasePaginator(myRef, {
  //       //   pageSize: size,
  //       //   finite: true
  //       // });
  //       let p = admin.database().ref('medicine/').orderByChild('name').limitToFirst(size).startAt('','5').endAt('\uf8ff').once('value')
  //                        .then((snapshots: any) => {
  //                            snapshots.forEach(function(snap: any){
  //                               let medicine = new Medicine();
  //                               medicine.fill(snap)
  //                               medicines.push(medicine);
  //                            })
  //                           resolve(medicines)
  //                       });
  //                   })
  //   }

  static getPharmaciesByDistrict(id: any, district: any){
    let pharmacies: any = [];
    return new Promise((resolve, reject)=>{
      admin.database().ref("medicine/"+id+"/pharmacies").orderByChild('district')
            .equalTo(district).once('value')
            .then((snapshots) => {    //...snapshot has all pharmacies having medicine within district
              console.log(snapshots.val());
              snapshots.forEach(function(snapshot: any){
                if(snapshot.val().quantity > 5){  //...only if medicine quantity is more than 5
                  // let pharmacy = new Pharmacy();
                  // pharmacy.fill(snapshot);
                  pharmacies.push(snapshot.key);
                }
              })
              resolve(pharmacies);
            }, error => reject());
    });
  }
}
