import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service'

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrls: ['./admin-notification.component.scss']
})
export class AdminNotificationComponent implements OnInit {

    mess;

  constructor(
      private api: ApiService,
  ) { }

  ngOnInit() {
      this.api.getMessage().pipe().subscribe(data=> {
          this.mess = data
          console.log(this.mess)
      })
  }

}
