import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export class Medicine{
  id: string;
  name: string;
  imageURL: string;
  category: string;   //medicines or accessories
  type: string;       //pills, ..
  num_units: number;
  unit_price: number;
  pharmacies:{};

  constructor(
      fields?: {
        id?: string,
        name?: string,
        imageURL?: string,
        category?: string,
        type?: string,
        num_units?: number,
        unit_price?: number
      }) {
      if (fields) Object.assign(this, fields);
  }

  fill(){
      return new Promise((resolve, reject)=>{
        if(!this.id) reject()
        let a = admin.database().ref('medicine/'+this.id).once("value").then((snapshot) => {
          let myMedicine = snapshot.val();
          this.name = myMedicine.name;
          this.category = myMedicine.category;
          resolve()
        },error => reject());
      })
  }
}
