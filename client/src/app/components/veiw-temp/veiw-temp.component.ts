import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service'
import { Video } from '../../classes/video'

@Component({
  selector: 'app-veiw-temp',
  templateUrl: './veiw-temp.component.html',
  styleUrls: ['./veiw-temp.component.scss']
})
export class VeiwTempComponent implements OnInit {

    tempId;
    tempType;
    videoDataM = new Video();  // FOR MOVIES ONLY
    videoDataS: Video[];  // FOR MOVIES ONLY

  constructor(
      private router: ActivatedRoute,
      private api: ApiService
  ) { }

  ngOnInit() {
      this.tempId = this.router.snapshot.paramMap.get('id')
      this.tempType = this.router.snapshot.paramMap.get('type')
      // Get all videos id;
      if(this.tempType == 'movies') {
          this.api.getMoviebyTempId({
              tempId: this.tempId,
          }).pipe().subscribe(data=> {
              this.videoDataM = data;
              console.log(this.videoDataM)
          })
      } else if(this.tempType == 'series') {
          this.api.getSeriesbyTempId({
              tempId: this.tempId,
          }).pipe().subscribe(data=> {
              this.videoDataS = data;
              console.log(this.videoDataS)
          })
      } else {
          // Error
      }
  }

}
