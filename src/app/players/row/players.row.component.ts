import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Court } from 'src/app/models/court';

@Component({
  selector: 'players-row',
  templateUrl: './players.row.component.html',
  styleUrls: ['./players.row.component.scss']
})
export class PlayersRowComponent implements OnInit {

  @Input() court!: Court;

  constructor() { }

  ngOnInit(): void {
  }
}
