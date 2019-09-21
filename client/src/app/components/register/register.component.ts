import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user'
import { ApiService } from '../../api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerUser = new User()
    err = false;
    error_mess;

  constructor(
      private api: ApiService,
      private router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
      this.api.register(this.registerUser).pipe().subscribe(data=> {
          if(typeof data == 'string') {
              this.err = true;
              this.error_mess = data;
          } else {
              this.router.navigateByUrl('/login');
          }
      })
  }

}
