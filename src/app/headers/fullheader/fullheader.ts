import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'fullheader',
  templateUrl: './fullheader.html',
  styleUrls: ['./fullheader.scss']
})
export class FullHeaderComponent {

  @Input() title = '';
  
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
    ) {
      this.matIconRegistry.addSvgIcon(
        "players",
        this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/players.svg")
      );      
    }

}
