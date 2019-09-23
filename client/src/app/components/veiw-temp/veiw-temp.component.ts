import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-veiw-temp',
  templateUrl: './veiw-temp.component.html',
  styleUrls: ['./veiw-temp.component.scss']
})
export class VeiwTempComponent implements OnInit {

    tempId;

  constructor(
      private router: ActivatedRoute
  ) { }

  ngOnInit() {
      //console.log(this.activatedRoute.paramMap.pipe(map(() => window.history.state.id)))
      console.log(this.router.snapshot.paramMap.get('id'))
  }

}
