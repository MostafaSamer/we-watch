import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service'
import { Video } from '../../classes/video'

@Component({
  selector: 'app-view-video-series',
  templateUrl: './view-video-series.component.html',
  styleUrls: ['./view-video-series.component.scss']
})
export class ViewVideoSeriesComponent implements OnInit {

    videoId;
    videoData = new Video();
    canLoad = false;

  constructor(
      private router: ActivatedRoute,
      private api: ApiService
  ) { }

  ngOnInit() {
      this.videoId = this.router.snapshot.paramMap.get('id');
      this.api.getSeriesbyIDS({
          id: this.videoId,
      }).pipe().subscribe(data=> {
          console.log(data)
          this.canLoad = true
      })
  }

}
