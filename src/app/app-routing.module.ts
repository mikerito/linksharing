import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { GroupsComponent } from './components/groups/groups.component';





const Routes: Routes = [
 { path: '',   redirectTo: '/groups', pathMatch: 'full' },
  { path: 'feed',
    component: PostsComponent,
},
  { path: 'groups',
    component: GroupsComponent,
    data: { title: 'Groups' }
  }
];

@NgModule({
    imports: [RouterModule.forChild(Routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
