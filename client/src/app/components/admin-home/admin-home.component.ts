import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service'

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

    tempM;
    tempS;
    notification_num;

  constructor(
      private api: ApiService,
  ) { }

  ngOnInit() {
      this.api.getMoviesTempAll().pipe().subscribe(data=> {
          this.tempM = data
          console.log(this.tempM)
      })
      this.api.getSeriesTemp().pipe().subscribe(data=> {
          this.tempS = data
          console.log(this.tempS)
      })
      this.api.getMessageNumber().pipe().subscribe(data=> {
          this.notification_num = data
          console.log(this.notification_num)
      })

  }

}
