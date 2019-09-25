import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service'
import { Video } from '../../classes/video'

@Component({
  selector: 'app-view-video-movies',
  templateUrl: './view-video-movies.component.html',
  styleUrls: ['./view-video-movies.component.scss']
})
export class ViewVideoMoviesComponent implements OnInit {

    videoId;
    videoData = new Video();
    canLoad = false;

  constructor(
      private router: ActivatedRoute,
      private api: ApiService
  ) { }

  ngOnInit() {
      this.videoId = this.router.snapshot.paramMap.get('id');
      this.api.getMoviebyIDS({
          id: this.videoId,
      }).pipe().subscribe(data=> {
          console.log(data)
          this.canLoad = true
      })
  }

}
