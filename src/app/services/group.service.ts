import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument }
from 'angularfire2/firestore';
import { Group } from "../models/group";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})

export class GroupService {
    groupsCollection: AngularFirestoreCollection<Group>;
    groups: Observable<Group[]>;
    groupDoc: AngularFirestoreDocument<Group>;

    constructor(public afs: AngularFirestore) {
      //this.items = this.afs.collection('items').valueChanges();

      this.groupsCollection = this.afs.collection('groups', ref => ref.orderBy('title','desc'));

      this.groups = this.groupsCollection.snapshotChanges().map(changes => {
        return changes.map(a => {
          const gdata = a.payload.doc.data() as Group;
          gdata.id = a.payload.doc.id;
           console.log(gdata)
          return gdata;
        });
      });
    }

    getGroups(){
      return this.groups;
    }

    addGroup(group: Group){
      this.groupsCollection.add(group);
    }

    deleteGroup(group: Group){
      this.groupDoc = this.afs.doc(`groups/${group.id}`);
      this.groupDoc.delete();
    }

    updateGroup(group: Group){
      this.groupDoc = this.afs.doc(`groups/${group.id}`);
      this.groupDoc.update(group);
    }

  }
