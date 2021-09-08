import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Court } from 'src/app/models/court';
import { Position } from 'src/app/models/position';

@Component({
  selector: 'position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {
  
  @Input() position!: Position;

  constructor() { }

  ngOnInit(): void { }
}
