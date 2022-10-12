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

  constructor(
    private router: Router,
    private sharedDataService: SharedDataService
     ) {
    console.log("PositionViewComponent.constructor()")
  }

  ngOnInit(): void {
    console.log("PositionViewComponent.ngOnInit()")
    console.log("PositionViewComponent.ngOnInit(): position: " + JSON.stringify(this.position))
  }
  
  onClick() {
    console.log("PositionViewComponent.onClick(): position: " + JSON.stringify(this.position))
    console.log("PositionViewComponent.onClick(): court: " + JSON.stringify(this.court))

    this.sharedDataService.changeCourt(this.court);

    this.router.navigate(['app/game']);
  }
}
