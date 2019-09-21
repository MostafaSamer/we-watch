import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user'
import { ApiService } from '../../api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
      this.api.login(this.loginEmail, this.loginPass).pipe().subscribe(data=> {
          if(typeof data == 'string') {
              this.err = true;
              this.error_mess = data;
          } else {
              localStorage.setItem('currentUser', JSON.stringify(data))
              this.router.navigateByUrl('/home');
          }
      })
  }

}
