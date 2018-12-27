import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { BrowseComponent } from './components/browse/browse.component';

//// Services
import { GroupService } from './services/group.service';
import { PostService } from './services/post.service';
import { FsService } from './services/fs.service';
import { ProfileListService } from './services/profile-list.service';

import { AuthGuard } from './core/auth.guard';

import { NavbarComponent } from './components/navbar/navbar.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule } from "@angular/material";
import { GroupsComponent } from './components/groups/groups.component';
import { GroupDetailComponent } from './components/group-detail/group-detail.component';
import { PostGroupFilterPipe } from './components/posts/postGroup-filter.pipe';

//MODULES
import { CoreModule } from './core/core.module';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { ReadLaterComponent } from './components/read-later/read-later.component';

const appRoutes: Routes = [
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
{ path: 'groups', component: GroupsComponent},
{ path: 'profile', component: UserProfileComponent },
{ path: 'browse/groups',   component: BrowseComponent},
{ path: 'browse/posts',   component: BrowseComponent},
{ path: 'browse/users',   component: BrowseComponent},
{ path: 'browse',   redirectTo: '/browse/groups', pathMatch: 'full' },
 { path: 'login', component: UserProfileComponent },
  { path:"**", component: PostsComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    NavbarComponent,
    AddPostComponent,
    GroupsComponent,
    GroupDetailComponent,
    PostGroupFilterPipe,
    UserLoginComponent,
    UserProfileComponent,
    BrowseComponent,
    ProfileListComponent,
    ReadLaterComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'postlink'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatSlideToggleModule,
  MatFormFieldModule,
  CoreModule,
  ],
  exports: [
       MatSlideToggleModule
  ],
  providers: [PostService, FsService, ProfileListService, GroupService,PostGroupFilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
