import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert/alert/alert.service';

@Component({
  selector: 'courts-page',
  templateUrl: './courts.page.html',
  styleUrls: ['./courts.page.scss']
})
export class CourtsPageComponent implements OnInit {

  pagename = 'Courts';

  constructor(
    public alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log("CourtsPageComponent.ngOnInit()")
  }

  onClick(event: Event): void {
    console.log('CourtsPageComponent.onClick()', event)
    this.router.navigate(['app/newcourt']);
  }

}
