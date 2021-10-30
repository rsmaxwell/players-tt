import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/model/person';

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
}
