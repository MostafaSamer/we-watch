import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'

@Component({
  selector: 'app-temp-movie',
  templateUrl: './temp-movie.component.html',
  styleUrls: ['./temp-movie.component.scss']
})
export class TempMovieComponent implements OnInit {

    name;
    returned_data;
    loading = false;

  constructor(
      private api: ApiService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
      this.loading = true
      this.api.addNewTempsMovies({
          name: this.name
      }).pipe().subscribe(data=> {
          console.log(data)
          this.loading = false
          this.returned_data = data
      })
  }

}
