import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router } from '@angular/router';
import { Video } from '../../../classes/video'

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

    temps;
    newVideo = new Video();
    formData: any = new FormData();
    loading = false;

  constructor(
      private api: ApiService,
      private router: Router,
  ) { }

  ngOnInit() {
      this.api.getSeriesTemp().pipe().subscribe((data: any)=> {
          this.temps = data
          console.log(data)
      })
  }

  fileChange(event) {
      this.formData.append('filess', event.target.files[0]);
  }

  onSubmit() {
      this.loading = true
      this.api.adminUploadSeries(this.formData, this.newVideo).pipe().subscribe((data: any)=> {
          console.log(data)
          this.loading = false
      })
  }

}
