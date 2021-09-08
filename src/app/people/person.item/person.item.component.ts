import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'personitem',
  templateUrl: './person.item.component.html',
  styleUrls: ['./person.item.component.scss']
})
export class PersonItemComponent implements OnInit {

  @Input() person!: Person;

  constructor() { }

  ngOnInit(): void {
  }

  getColour(person: Person) {
    if (person.status == "player") {
      return "black";
    } else if (person.status == "inactive") {
      return "silver";
    } else if (person.status == "suspended") {
      return "white";
    } else if (person.status == "admin") {
      return "white";
    }
    return "white";
  }

  getBackgroundColour(person: Person) {
    if (person.status == "player") {
      return "#d7e8d3ff";
    } else if (person.status == "inactive") {
      return "white";
    } else if (person.status == "suspended") {
      return "#405061";
    } else if (person.status == "admin") {
      return "cyan";
    }
    return "red";
  }
}
