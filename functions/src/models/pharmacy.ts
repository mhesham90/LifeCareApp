import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export class Pharmacy{
  uid: string;
  name: string;
  imageURL: string;
  telephone: string;
  loaction: any; // {long:'...', lat:'...'}
  district: string;
  delivery_areas: any; // fill array from snapshot
  medicine: any;  // fill array with medicine
  delivery_start_time: string;  //24 hr string
  delivery_end_time: string;  //24 hr string

  fill(snapshot: any){
    Object.assign(this, snapshot.val());
    this.uid = snapshot.key;
  }

  getById(id: any){
      return new Promise((resolve, reject)=>{
        let a = admin.database().ref('pharmacy/'+id).once("value").then((snapshot) => {
          this.fill(snapshot)
          resolve()
        },error => reject());
      })
  }
}
