import * as admin from 'firebase-admin'
var inside = require('point-in-polygon');
export default class District{
    id :string
    name  :string;
    points :string;


    constructor (){

    }

    fill(snapshot: any){

        this.id = snapshot.key;
        let myObj = snapshot.val();
        this.name = myObj.name;
        this.points=myObj.points

    }

    static getAll(): any{
        return new Promise((resolve, reject)=>{
          let a = admin.database().ref('district').orderByChild('name')
                                                  .once("value")
                                                  .then((snapshots) => {
                                                      let districts: District[] = [];
                                                      snapshots.forEach(function(snap: any){
                                                        let district = new District();
                                                        district.fill(snap)
                                                        districts.push(district);
                                                      })
                                                      resolve(districts)
                                                  }, error => reject());
                                              })
  }

  static getByCoords(long: number, lat: number): any{
    return District.getAll()
      .then((districts: any) => {
        return new Promise((resolve, reject) =>{
            districts.forEach((dist: any) => {
              let pointsString = dist.points || "";
              let myPoints = pointsString.split(",");
              let pointsList: any = [];
              for (var i=0; i<myPoints.length; i+=2)
                  pointsList.push(myPoints.slice(i,i+2));
              pointsList = pointsList.map((arr: any) => arr.map(Number))
              if(inside([ long, lat ], pointsList)){
                  resolve(dist);
              }
            })
            resolve(new District());
        })
      })
  }
}
