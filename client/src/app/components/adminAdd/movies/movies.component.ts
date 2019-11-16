import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router } from '@angular/router';
import { Video } from '../../../classes/video'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

    temps = [];
    newVideo = new Video();
    formData: any = new FormData();
    loading = false;

  constructor(
      private api: ApiService,
      private router: Router,
  ) { }

  ngOnInit() {
      this.api.getMoviesTemp().pipe().subscribe((data: any)=> {
          this.temps = data
          console.log(data)
      })
  }

  fileChange(event) {
      this.formData.delete('filess');
      this.formData.append('filess', event.target.files[0]);
  }

  onSubmit() {
      this.loading = true
      this.api.adminUploadMovie(this.formData, this.newVideo).pipe().subscribe(data=> {
          console.log(data)
          this.temps = this.temps.splice(this.temps.indexOf(this.newVideo), 1)
          this.loading = false
      })
  }

}
