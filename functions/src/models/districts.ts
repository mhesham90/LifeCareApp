import * as admin from 'firebase-admin'
export default class District 
{   
    id :string
    name  :string; 
    points :string;


    constructor ()
    {
    }

    fill(snapshot: any){

        this.id = snapshot.key;
        let myObj = snapshot.val();
        console.log(snapshot)
        this.name = myObj.name;
        this.points=myObj.points
        
    }

//     getAllDistricts():any{
//         return  new Promise((resolve, reject)=>{
//         let a = admin.database().ref('district').once("value").then((snapshot) => {
//           this.fill(snapshot)
//           resolve()
//         },error => reject());
//       })
//   }
}