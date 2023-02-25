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

  cssClass(name: string) {

    let map = new Map([
        ['admin', 'bg-blue-500 text-white'],
        ['player', 'bg-white text-black'],
        ['inactive', 'bg-white text-silver'],
        ['suspended', 'bg-slategray text-white']
    ])

    return map.get(name);
}  
}



// .player {
//   color: black;
//   background-color: white;
// }
// 
// .inactive {
//   color: silver;
//   background-color: white;
// }
// 
// .suspended {
//   color: white;
//   background-color: slategray;
// } 
// 
// .admin {
//   color: white;
//   background-color: blue;  
// }
