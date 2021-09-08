import { Component, Input, OnInit } from '@angular/core';
import { Court } from 'src/app/models/court';

@Component({
  selector: 'court-item',
  templateUrl: './court.item.component.html',
  styleUrls: ['./court.item.component.scss']
})
export class CourtItemComponent implements OnInit {

  @Input() court!: Court;

  // positions: Position[] = []

  constructor() { }

  ngOnInit(): void {
    // let sparceArray: Array<Position> = this.court.positions

    // let mapOfPositions = new Map<number, Position>()
    // sparceArray.forEach(position => {
    //   mapOfPositions.set(position.index, position)
    // });

    // for (let i = 0; i < 4; i++) {
    //   let position = mapOfPositions.get(i)
    //   if (!position) {
    //     position = {index: -1, personid: -1, displayname: ""}
    //   }
    //   this.positions.push(position)
    // }
  }
}
