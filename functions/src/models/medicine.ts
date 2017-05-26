import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export default class Medicine{
  id: string;
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
    this.id = snapshot.key;
    let myObj = snapshot.val();
    this.name = myObj.name;
    this.category = myObj.category;
  }

  getById(id: any){
      return new Promise((resolve, reject)=>{
        let a = admin.database().ref('medicine/'+id).once("value").then((snapshot) => {
          this.fill(snapshot)
          resolve()
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
}
