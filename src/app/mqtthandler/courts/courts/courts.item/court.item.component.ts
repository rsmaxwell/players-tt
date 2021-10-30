import { Component, Input, OnInit } from '@angular/core';
import { Court } from 'src/app/model/court';

@Component({
  selector: 'court-item',
  templateUrl: './court.item.component.html',
  styleUrls: ['./court.item.component.scss']
})
export class CourtItemComponent implements OnInit {

  @Input() court!: Court;

  constructor() { 
    console.log("CourtItemComponent.constructor()")
  }

  ngOnInit(): void {
    console.log("CourtItemComponent.ngOnInit()")
  }
}
