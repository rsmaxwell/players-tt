import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'waiters-page',
  templateUrl: './waiters.page.html',
  styleUrls: ['./waiters.page.scss']
})
export class WaitersPageComponent implements OnInit {

  pagename = 'Waiters';

  ngOnInit(): void {
  }

}
