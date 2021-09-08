import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fullfooter',
  templateUrl: './fullfooter.html',
  styleUrls: ['./fullfooter.scss']
})
export class FullFooterComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
  }

}
