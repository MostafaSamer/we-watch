import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user'

@Component({
  selector: 'app-list-fav',
  templateUrl: './list-fav.component.html',
  styleUrls: ['./list-fav.component.scss']
})
export class ListFavComponent implements OnInit {

  user = new User();
  canLoad = false;

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'))
    console.log(this.user);
    console.log(JSON.parse(localStorage.getItem('currentUser')))
    this.canLoad = true;

  }

}
