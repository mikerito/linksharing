import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument }
from 'angularfire2/firestore';
import { Observable } from 'rxjs/observable';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-read-later',
  templateUrl: './read-later.component.html',
  styleUrls: ['./read-later.component.css']
})

export class ReadLaterComponent implements OnInit, OnDestroy {

    public displayHead = false;



    postObj: Post;
    statusMessage: string;

    private ngUnsubscribe = new Subject();
    posts: Post[];
    filteredPosts: Post[];
    private _searchTerm: string;
    postUrl: "";
    filteredUrl: "";

    get searchTerm(): string {
        return this._searchTerm;
    }

    set searchTerm(value: string) {
        this._searchTerm = value;
        this.filteredPosts = this.filterPosts(value);
    }

    filterPosts(searchString: string) {
        let filter = this.posts.filter(post => post.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
        //let titleFilter = this.posts.filter(post => post.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);

        return filter

    }


    editState: boolean = false;
    postToEdit: Post;

    isDataAvailable:boolean = false;

  constructor(private postService: PostService,
        private route: ActivatedRoute, private router:Router) {
  }


  ngOnInit() {

      this.postService.getPosts() .pipe(
               takeUntil(this.ngUnsubscribe)
            )
            .subscribe(posts => {
          this.posts = posts;
        this.filteredPosts = this.posts;
    });
  }

  ngOnDestroy() {
   this.ngUnsubscribe.next();
         this.ngUnsubscribe.complete();
 }

  deletePost(event, post: Post) {
      this.clearState();
      this.postService.deletePost(post);
  }

  editPost(event, post: Post){
      this.editState = true;
      this.postToEdit = post;
  }

  updatePost(post: Post){
      this.postService.updatePost(post);
      this.clearState();
  }

  clearState(){
      this.editState = false;
      this.postToEdit = null;
  }

}
