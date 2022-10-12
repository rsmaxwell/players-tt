import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Court } from 'src/app/model/court';
import { Position } from 'src/app/model/position';
import { Waiter } from 'src/app/model/waiter';

@Component({
  selector: 'position-edit',
  templateUrl: './position.html',
  styleUrls: ['./position.scss']
})
export class PositionEditComponent implements OnInit {

  @Input() waiters: Waiter[] = [];
  @Input() position!: Position;
  @Input() court!: Court;

  constructor( ) {
    console.log("PositionEditComponent.constructor()")
  }

  ngOnInit(): void {
    console.log("PositionEditComponent.ngOnInit()")
  }
}
