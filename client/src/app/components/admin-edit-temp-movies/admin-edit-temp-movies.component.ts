import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service'

@Component({
  selector: 'app-admin-edit-temp-movies',
  templateUrl: './admin-edit-temp-movies.component.html',
  styleUrls: ['./admin-edit-temp-movies.component.scss']
})
export class AdminEditTempMoviesComponent implements OnInit {

    id;

  constructor(
      private router: ActivatedRoute,
      private api: ApiService,
  ) { }

  ngOnInit() {
      this.id = this.router.snapshot.paramMap.get('id')

  }

  deleteTemp() {
      this.api.deleteTempMovie(this.id).pipe().subscribe(data=> {
          console.log(data)
      })
  }

}
