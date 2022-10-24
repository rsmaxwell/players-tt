import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Court } from 'src/app/model/court';
import { Position } from 'src/app/model/position';
import { SharedDataService } from 'src/app/service/game.service';

@Component({
  selector: 'position-view',
  templateUrl: './position.html',
  styleUrls: ['./position.scss']
})
export class PositionViewComponent implements OnInit {
  
  @Input() position!: Position;
  @Input() court!: Court;

  displayPosition!: string;

  constructor(
    private router: Router,
    private sharedDataService: SharedDataService
     ) {
    console.log("PositionViewComponent.constructor()")
  }

  ngOnInit(): void {
    console.log("PositionViewComponent.ngOnInit(): position: " + JSON.stringify(this.position))
    this.displayPosition = (this.position.personId != null) ? this.position.personId.knownas : ''
    console.log("PositionViewComponent.ngOnInit(): displayPosition: " + JSON.stringify(this.displayPosition))
  }
  
  onClick() {
    console.log("PositionViewComponent.onClick(): position: " + JSON.stringify(this.position))
    console.log("PositionViewComponent.onClick(): court: " + JSON.stringify(this.court))

    this.sharedDataService.changeCourt(this.court);

    this.router.navigate(['app/game']);
  }
}
