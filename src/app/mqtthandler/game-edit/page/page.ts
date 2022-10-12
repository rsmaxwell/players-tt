import { Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'game-page',
  templateUrl: './page.html',
  styleUrls: ['./page.scss'],
})
export class GameEditPageComponent implements OnInit, OnDestroy {
  
  pagename = 'Game';  

  ngOnInit(): void {
    console.log("GameEditPageComponent.ngOnInit()")
  }

  ngOnDestroy(): void {
    console.log("GameEditPageComponent.ngOnDestroy()")
  }
}
