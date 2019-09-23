import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service'
import { NavbarComponent } from '../navbar/navbar.component'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    dataM = [];
    dataS = [];
    offset = 1;

  constructor(
      private api: ApiService,
  ) { }

  ngOnInit() {
      this.api.getlastAddedMovie(this.offset).pipe().subscribe(data=> {
          this.dataM = data
           console.log(data)
      })
      this.api.getlastAddedSeries(this.offset).pipe().subscribe(data=> {
          this.dataS = data
          console.log(data)
      })
  }

}
