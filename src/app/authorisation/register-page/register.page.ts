import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'register-page',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  pagename = 'Register';

  constructor() { }

  ngOnInit(): void {
  }

}
