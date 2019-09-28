import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'

@Component({
  selector: 'app-temp-series',
  templateUrl: './temp-series.component.html',
  styleUrls: ['./temp-series.component.scss']
})
export class TempSeriesComponent implements OnInit {

    name;
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
      this.api.addNewTempSeries({
          name: this.name
      }, this.formData).pipe().subscribe(data=> {
          console.log(data)
          this.loading = false
      })
  }

}
