import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/group';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups$;

  private ngUnsubscribe = new Subject();

  groups: Group[];
  filteredGroups: Group[];
  alias: string;
  editState: boolean = false;
  groupToEdit: Group;

  private _GsearchTerm: string;

  get GsearchTerm(): string {
    return this._GsearchTerm;
  }

  set GsearchTerm(value: string) {
    this._GsearchTerm = value;
    this.filteredGroups = this.filterGroups(value);
  }

  filterGroups(searchString: string) {
    return this.groups.filter(group =>
      group.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  constructor(private groupService: GroupService,
    private route: ActivatedRoute,
    private afs: AngularFirestore) {
  }


  ngOnInit() {


    this.groupService.getGroups().pipe(
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe(groups => {
        console.log(groups);
        this.groups = groups;
        this.filteredGroups = this.groups;
        console.log(groups)
      });

    this.groups$ = this.afs.collection('groups').valueChanges();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  deleteGroup(event, group: Group) {
    this.clearState();
    this.groupService.deleteGroup(group);
  }

  editGroup(event, group: Group) {
    this.editState = true;
    this.groupToEdit = group;
  }

  updateGroup(group: Group) {
    this.groupService.updateGroup(group);
    this.clearState();
  }

  clearState() {
    this.editState = false;
    this.groupToEdit = null;
  }


  connect() {
    return this.groupService.getGroups();
  }

  disconnect() {

  }


}
