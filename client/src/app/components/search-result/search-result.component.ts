import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service'

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

    searchName;
    dataM;
    dataS;

  constructor(
      private router: ActivatedRoute,
      private api: ApiService,
  ) { }

  ngOnInit() {
      this.searchName = this.router.snapshot.paramMap.get('name')
      this.api.search({
          key: this.searchName
      }).pipe().subscribe(data=> {
          console.log(data)
          this.dataM = data[0]
          this.dataS = data[1]
      })
  }

}
