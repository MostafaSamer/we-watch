import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service'
import { Router } from '@angular/router';
import { Video } from '../../classes/video'

const URL = 'http://localhost:3000/admin/upload';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss']
})
export class AdminAddComponent implements OnInit {

    newVideo = new Video();
    formData: any = new FormData();

  constructor(
      private api: ApiService,
      private router: Router,
  ) { }

  ngOnInit() {}

  fileChange(event) {
      console.log(event.target.files[0])
      this.formData.append('filess', event.target.files[0]);
  }

  onSubmit() {
      //this.formData.append('user', this.newVideo);
      this.api.adminUploadSeries(this.formData, this.newVideo).pipe().subscribe(data=> {
          console.log(data)
      })
  }

}
