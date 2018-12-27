import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument }
from 'angularfire2/firestore';
import { Profile } from "../models/profile";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})

export class ProfileListService {
    profilesCollection: AngularFirestoreCollection<Profile>;
    profiles: Observable<Profile[]>;
    profileDoc: AngularFirestoreDocument<Profile>;

    constructor(public afs: AngularFirestore) {
      //this.items = this.afs.collection('items').valueChanges();

      this.profilesCollection = this.afs.collection('users', ref => ref.orderBy('displayName','desc'));

      this.profiles = this.profilesCollection.snapshotChanges().map(changes => {
        return changes.map(a => {
          const pdata = a.payload.doc.data() as Profile;
          pdata.id = a.payload.doc.id;
           console.log(pdata)
          return pdata;
        });
      });
    }

    getProfiles(){
      return this.profiles;
    }

  }
