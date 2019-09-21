import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'

@Component({
  selector: 'app-temp-series',
  templateUrl: './temp-series.component.html',
  styleUrls: ['./temp-series.component.scss']
})
export class TempSeriesComponent implements OnInit {

    name;
    loading = false;

  constructor(
        private api: ApiService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
      this.loading = true
      this.api.addNewTempSeries({
          name: this.name
      }).pipe().subscribe(data=> {
          console.log(data)
          this.loading = false
      })
  }

}
