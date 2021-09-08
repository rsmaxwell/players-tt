import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Court } from 'src/app/models/court';

@Component({
  selector: 'court-row',
  templateUrl: './court.row.component.html',
  styleUrls: ['./court.row.component.scss']
})
export class CourtRowComponent implements OnInit {

  @Input() court!: Court;

  constructor() { }

  ngOnInit(): void {
  }
}
