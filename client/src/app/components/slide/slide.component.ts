import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user'

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {

    user = new User()
    list = [
        {
            title: "Last Added",
            link: "/home"
        },
        {
            title: "Movies",
            link: "/movies"
        },
        {
            title: "Series",
            link: "/series"
        },
        {
            title: "Favorite",
            link: "/listFav"
        },
        {
            title: "Contact Us",
            link: "/contact"
        }
    ]

  constructor() { }

  ngOnInit() {
      this.user = JSON.parse(localStorage.getItem('currentUser'))
  }

}
