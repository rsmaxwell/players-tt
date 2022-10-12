import { Component, Input, OnInit } from '@angular/core';
import { Court } from 'src/app/model/court';

@Component({
  selector: 'grid-view',
  templateUrl: './grid.html',
  styleUrls: ['./grid.scss']
})
export class GridViewComponent implements OnInit {

  @Input() court!: Court;

  constructor() { 
    console.log("GridViewComponent.constructor()")
  }

  ngOnInit(): void { 
    console.log("GridViewComponent.ngOnInit(): court: " + JSON.stringify(this.court))
  }
}
