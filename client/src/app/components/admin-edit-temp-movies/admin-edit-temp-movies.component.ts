import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service'
import { Video } from '../../classes/video'

@Component({
  selector: 'app-admin-edit-temp-movies',
  templateUrl: './admin-edit-temp-movies.component.html',
  styleUrls: ['./admin-edit-temp-movies.component.scss']
})
export class AdminEditTempMoviesComponent implements OnInit {

    id;
    video = new Video();

  constructor(
      private router: ActivatedRoute,
      private api: ApiService,
  ) { }

  ngOnInit() {
      this.id = this.router.snapshot.paramMap.get('id')
      this.api.getMoviesTempById(this.id).pipe().subscribe((data: Video)=> {
          this.video = data;
          console.log(this.video)
      })
  }

  deleteTemp() {
      this.api.deleteTempMovie(this.id).pipe().subscribe(data=> {
          console.log(data)
      })
  }

}
