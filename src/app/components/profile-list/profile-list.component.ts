import { Component, OnInit } from '@angular/core';
import { ProfileListService } from '../../services/profile-list.service';
import { Profile } from '../../models/profile';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {

  profiles$;
  private ngUnsubscribe = new Subject();
  profiles: Profile[];
  filteredProfile: Profile[];
      private _PsearchTerm: string;
  alias: string;
  editState: boolean = false;
  profileToEdit: Profile;

  get PsearchTerm(): string {
    return this._PsearchTerm;
  }

  set PsearchTerm(value: string) {
    this._PsearchTerm = value;
    this.filteredProfile = this.filterProfiles(value);
  }

  filterProfiles(searchString: string) {
      let filter = this.profiles.filter(profiles => profiles.displayName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
      //let titleFilter = this.posts.filter(post => post.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);

      return filter

  }

  constructor(private profilelistService: ProfileListService,
    private route: ActivatedRoute,
    private afs: AngularFirestore) { }

  ngOnInit() {
    this.profilelistService.getProfiles().pipe(
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe(profiles => {
        console.log(profiles);
        this.profiles = profiles;
        this.filteredProfile = this.profiles;
        console.log(profiles)
      });

    this.profiles$ = this.afs.collection('users').valueChanges();
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
