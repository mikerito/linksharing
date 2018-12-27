import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
    groupName = (this.route.snapshot.url[1].path);

  constructor(private route: ActivatedRoute, private router:Router) { }

  //showMenu = false;
  ngOnInit() {
  }

}
