import * as admin from 'firebase-admin'
export default class District 
{
    name  :string; 
    point :string;


    constructor ()
    {
    }


    getAllDistricts():any{
        return admin.database().ref('/test').push({testdist: 'district'}).then(snapshot => {
                // console.log("in destrictt model snapshot",snapshot)
            return snapshot.ref;
        });
    }

}