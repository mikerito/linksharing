import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument }
from 'angularfire2/firestore';
import { Post } from "../models/post";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable({
  providedIn: 'root'
})

export class PostService {
    body: string;

    userId: string;
    userName: string;
    postsCollection: AngularFirestoreCollection<Post>;
    posts: Observable<Post[]>;
    postDoc: AngularFirestoreDocument<Post>;

    constructor(public afs: AngularFirestore, private route: ActivatedRoute, private afAuth: AngularFireAuth) {
      //this.items = this.afs.collection('items').valueChanges();

      this.postsCollection = this.afs.collection('posts', ref => ref.orderBy('time','desc'));

      this.posts = this.postsCollection.snapshotChanges().map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Post;
          data.id = a.payload.doc.id;
          return data;
        });
      });

      this.afAuth.authState.subscribe(user => {
          if(user) {
              this.userId = user.uid;
            this.userName = user.displayName;

          }
  })

    }

    getPosts(){
        console.log("get posts ran")
      return this.posts;
    }

    getPostsList(){
    if (!this.userId) return;
    this.postsCollection = this.afs.collection(`posts/`);
    return this.postsCollection
  }

    addPost(post: Post){
        if(this.userId == "") {
            post.userId = "Guest";
            post.userName = "Guest";
            this.postsCollection.add(post);
        } else {
            post.userId = this.userId;
            post.userName = this.userName;
           this.postsCollection.add(post);
           post.userName = "";
           post.userId = "";
        }
    }

    deletePost(post: Post){
      this.postDoc = this.afs.doc(`posts/${post.id}`);
      this.postDoc.delete();
    }

    updatePost(post: Post){
      this.postDoc = this.afs.doc(`posts/${post.id}`);
      this.postDoc.update(post);
    }

  }
