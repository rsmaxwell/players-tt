import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Court } from 'src/app/model/court';

@Component({
  selector: 'game-view',
  templateUrl: './game.html',
  styleUrls: ['./game.scss']
})
export class GameViewComponent implements OnInit {

  @Input() court!: Court;

  constructor() {
    console.log("GameViewComponent.ngOnInit()")
  }

  ngOnInit(): void {
    console.log("GameViewComponent.ngOnInit()")
  }
}
