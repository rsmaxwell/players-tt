import { Component, Input, OnInit } from '@angular/core';
import { Waiter } from 'src/app/model/waiter';

@Component({
  selector: 'waiter-item',
  templateUrl: './waiter.item.component.html',
  styleUrls: ['./waiter.item.component.scss']
})
export class WaiterItemComponent implements OnInit {

  @Input() waiter!: Waiter;

  constructor() { }

  ngOnInit(): void {
  }
}
