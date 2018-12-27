import { Component } from '@angular/core';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';


const settings = {timestampsInSnapshots: true};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'linksharing';

  constructor() {

  }

  ngOnInit() {
}

}
