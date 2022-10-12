import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Court } from 'src/app/model/court';
import { GridEditComponent } from '../grid/grid';

@Component({
  selector: 'game-edit',
  templateUrl: './game.html',
  styleUrls: ['./game.scss']
})
export class GameEditComponent implements OnInit {

  @Input() court!: Court;

  name = new FormControl('', [
    Validators.required
  ])

  form = new FormGroup({
    name: this.name
  });

  constructor(
    private router: Router) {
    console.log("GameEditComponent.constructor()")
  }

  ngOnInit(): void {
    console.log("GameEditComponent.ngOnInit()")
//    @ViewChild(GridEditComponent, { static: true }) gridEditForm: GridEditComponent;
  }

  onSubmit(): void {
    console.log("GameEditComponent.onSubmit()")
  }

  onCancel(): void {
    console.log("GameEditComponent.onCancel()")
    this.router.navigate(['app/games']);
  }
}
