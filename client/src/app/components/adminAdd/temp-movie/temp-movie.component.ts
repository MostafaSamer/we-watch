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
    formData: any = new FormData();
    loading = false;

  constructor(
      private api: ApiService
  ) { }

  ngOnInit() {
  }

  fileChange(event) {
      this.formData.delete('filess');
      this.formData.append('filess', event.target.files[0]);
  }


  onSubmit() {
      this.loading = true
      this.api.addNewTempsMovies({
          name: this.name
      }, this.formData).pipe().subscribe(data=> {
          console.log(data)
          this.loading = false
          this.returned_data = data
      })
  }

}
