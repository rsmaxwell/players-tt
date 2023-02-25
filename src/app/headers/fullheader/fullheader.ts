import { Component, Input } from '@angular/core';

@Component({
  selector: 'fullheader',
  templateUrl: './fullheader.html',
  styleUrls: ['./fullheader.scss']
})
export class FullHeaderComponent {

  @Input() title = '';
  
}
