import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
    group$;
  constructor(private afs: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit() {
      this.group$ = this.route.paramMap.pipe(
          switchMap(params => {
              const title = params.get('title');
              return this.afs.doc('groups/' + title).valueChanges();
              console.log("YEAH OK")
          })
            );

 // this.group$ = this.route.data.pipe(map(val => val[0]));

  }


}
