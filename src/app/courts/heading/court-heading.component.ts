import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Court } from 'src/app/models/court';
import { PlayersService } from 'src/app/service/players.service';
import { AlertService } from 'src/app/_alert';


@Component({
  selector: 'court-heading',
  templateUrl: './court-heading.component.html',
  styleUrls: ['./court-heading.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourtHeadingComponent implements OnInit {

  @Input() court!: Court;

  constructor(
    private playersService: PlayersService,
    private cd: ChangeDetectorRef,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  onFill(court: Court): void {
    this.playersService.fillCourt(court)
      .subscribe(
        reply => {
          court.positions = reply.positions
          Court.expand(court)
        },
        error => {
          console.log("CourtHeadingComponent.onFill: error: " + JSON.stringify(error))
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
          console.log("CourtHeadingComponent.onClear: error: " + JSON.stringify(error))
          this.alertService.errorDump("Could not clear the court", error);
        },
      );
  }
}
