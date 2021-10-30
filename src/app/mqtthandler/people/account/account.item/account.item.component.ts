import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/model/person';

@Component({
  selector: 'accountitem',
  templateUrl: './account.item.component.html',
  styleUrls: ['./account.item.component.scss']
})
export class AccountItemComponent implements OnInit {

  @Input() person!: Person;

  constructor() { }

  ngOnInit(): void {
  }
}
