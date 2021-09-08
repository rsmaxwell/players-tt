import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/_alert';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'dump-item',
  templateUrl: './dump.item.component.html',
  styleUrls: ['./dump.item.component.scss']
})
export class DumpItemComponent implements OnInit, OnDestroy {

  detail!: any;
  errorSubscription: Subscription | undefined;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.errorSubscription = this.messageService.currentMessage.subscribe(
      message => {
        this.detail = message
        console.log("DumpItemComponent.ngOnInit: message: " + JSON.stringify(this.detail))
      })
  }

  ngOnDestroy() {
    this.errorSubscription?.unsubscribe();
  }
}
