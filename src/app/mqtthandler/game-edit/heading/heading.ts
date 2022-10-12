import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { Court } from 'src/app/model/court';
import { SharedDataService } from 'src/app/service/game.service';


@Component({
  selector: 'grid-edit-heading',
  templateUrl: './heading.html',
  styleUrls: ['./heading.scss'],
})
export class GridEditHeadingComponent implements OnInit, OnDestroy {

  @Input() court!: Court;

  constructor(
    private sharedDataService: SharedDataService
  ) {
    console.log("GridEditHeadingComponent.constructor: court: " + JSON.stringify(this.court));
  }

  ngOnInit(): void {
    this.sharedDataService.currentCourt.subscribe(court => (this.court = court)); //<= Always get current value!    
    console.log("GridEditHeadingComponent.ngOnInit: court: " + JSON.stringify(this.court));
  }

  ngOnDestroy(): void {
    console.log("GridEditHeadingComponent.ngOnDestroy");
  }
}
