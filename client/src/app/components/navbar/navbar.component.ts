import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    nameSearch;

  constructor(
      private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
      this.router.navigate(['/search', this.nameSearch])
  }

  logout() {
      localStorage.setItem('currentUser', null)
      this.router.navigateByUrl('/login');
  }


}
