import { Component, Input, OnInit } from '@angular/core';
import { Court } from 'src/app/models/court';

@Component({
  selector: 'players-item',
  templateUrl: './players-item.component.html',
  styleUrls: ['./players-item.component.scss']
})
export class PlayersItemComponent implements OnInit {

  @Input() court!: Court;

  constructor() { }

  ngOnInit(): void { }
}
