import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Court } from 'src/app/model/court';
import { SharedDataService } from 'src/app/service/game.service';

@Component({
  selector: 'grid-view',
  templateUrl: './grid.html',
  styleUrls: ['./grid.scss']
})
export class GridViewComponent implements OnInit {

  @Input() court!: Court;

  constructor(
    private router: Router,
    private sharedDataService: SharedDataService) { 
    console.log("GridViewComponent.constructor()")
  }

  ngOnInit(): void { 
    console.log("GridViewComponent.ngOnInit(): court: " + JSON.stringify(this.court))
  }

  onClick() {
    console.log("GridViewComponent.onClick(): court: " + JSON.stringify(this.court))

    this.sharedDataService.changeCourt(this.court);

    this.router.navigate(['app/game']);
  }
}
