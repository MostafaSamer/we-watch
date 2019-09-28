import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    dataM = [];
    dataS = [];
    //Paging
    offset = 1;
    maxOffset;
    preButtonDisable = false;
    nextButtonDisable = false;

  constructor(
      private api: ApiService,
  ) { }

  ngOnInit() {
      this.api.getlastAddedMovie(this.offset).pipe().subscribe(data=> {
          this.dataM = data
           console.log(data)
      })
      this.api.getlastAddedSeries(this.offset).pipe().subscribe(data=> {
          this.dataS = data
          console.log(data)
      })
      this.api.numberOfvideos().pipe().subscribe((data: any)=> {
          if(data.s > data.m) {
              this.maxOffset = +(''+data.s)[0]+1
          } else {
              this.maxOffset = +(''+data.m)[0]+1
          }
          console.log("MaxOffset: " + this.maxOffset)
      })
      if(this.offset == 1) {
          this.preButtonDisable = true;
      } else {
          this.preButtonDisable = false;
      }
      if(this.offset == this.maxOffset) {
          this.nextButtonDisable = true;
      } else {
          this.nextButtonDisable = false;
      }
  }

  nextPage() {
      this.offset++;
      this.ngOnInit();
  }

  prePage() {
      this.offset--;
      this.ngOnInit();
  }

}
