import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service'

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

    err = false;
    error_mess = "Fileds is empty";
    succ = false;
    succ_mess = "Message send Succsusfull!";
    title;
    mess;

  constructor(
      private api: ApiService,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
      console.log(this.title)
      console.log(this.mess)
      if(this.title == undefined || this.mess == undefined) {
          this.succ = false
          this.succ_mess = "Message send Succsusfull!"
          this.err = true
      } else {
          this.err = false
          this.api.sendMessage(this.title, this.mess).pipe().subscribe(data=> {
              console.log(data)
              this.title = undefined
              this.mess = undefined
              this.succ = true
          })
      }
  }

}
