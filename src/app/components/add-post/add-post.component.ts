import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})

export class AddPostComponent implements OnInit {

    post: Post = {
        url:'',
        title: '',
        description: '',
        time: Date.now(),
        group: '',
        source: '',
        userName: '',
        userId: '',
    }

    editState: boolean = true;

  constructor(private postService: PostService, public auth: AuthService) {
  }

  ngOnInit() {
  }

  onSubmit() {

      let urltext = this.post.url;
      let urlfront = (urltext.split('.com')[0]);
      let urlmiddle = "test";

      if (urlfront.includes('www.')) {
          urlmiddle = (urlfront.split('www.')[1]);
      } else if (urlfront.includes('https://')) {
          urlmiddle = (urlfront.split('https://')[1]);
      } else {
          urlmiddle = urlfront;
      }

     this.post.source = urlmiddle;

      if(this.post.title != '' && this.post.description != ''){
          this.postService.addPost(this.post);
          this.post.url= '';
          this.post.group= '';
          this.post.title = '';
          this.post.description = '';
      }

  }

  editPost(event){
      this.editState = true;
  }

  flipState(event){
      this.editState = !this.editState;
  }

  clearState(){
      this.editState = false;
  }

}
