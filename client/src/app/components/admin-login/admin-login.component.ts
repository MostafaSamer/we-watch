import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

    loginEmail;
    loginPass;
    err = false;
    error_mess;

  constructor(
      private api: ApiService,
      private router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
      this.api.adminLogin(this.loginEmail, this.loginPass).pipe().subscribe(data=> {
          if(typeof data == 'string') {
              this.err = true;
              this.error_mess = data;
          } else {
              localStorage.setItem('currentUser', JSON.stringify(data))
              this.router.navigateByUrl('/admin-home');
          }
      })
  }

}
