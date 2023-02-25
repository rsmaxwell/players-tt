import { Component, Input } from '@angular/core';


@Component({
  selector: 'plainheader',
  templateUrl: './plainheader.html',
  styleUrls: ['./plainheader.scss']
})
export class PlainHeaderComponent {

  @Input() title = '';
  
}
