import { Component, Input, OnInit, Output } from '@angular/core';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { Court } from 'src/app/models/court';
import { PlayersService } from 'src/app/service/players.service';


@Component({
  selector: 'players-heading',
  templateUrl: './players-heading.component.html',
  styleUrls: ['./players-heading.component.scss'],
})
export class PlayersHeadingComponent implements OnInit {

  @Input() court!: Court;

  constructor(
    private playersService: PlayersService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  onFill(court: Court): void {
    this.playersService.fillCourt(court)
      .subscribe(
        positions => {
          court.positions = positions
          Court.expand(court)
        },
        error => {
          console.log("PlayersHeadingComponent.onFill: error: " + JSON.stringify(error))
          this.alertService.errorDump("Could not fill the court", error);
        },
      );
  }

  onClear(court: Court): void {
    this.playersService.clearCourt(court)
      .subscribe(
        reply => {
          court.positions = []
          Court.expand(court)
        },
        error => {
          console.log("PlayersHeadingComponent.onClear: error: " + JSON.stringify(error))
          this.alertService.errorDump("Could not clear the court", error);
        },
      );
  }
}
