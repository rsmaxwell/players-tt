import { Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'plainheader',
  templateUrl: './plainheader.html',
  styleUrls: ['./plainheader.scss']
})
export class PlainHeaderComponent {

  @Input() title = '';
  
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    // iconRegistry.addSvgIcon(
    //     'players',
    //     sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/players.svg'));
  }

}
