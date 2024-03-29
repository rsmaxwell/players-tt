﻿import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/dump/service/message.service';


import { Alert, AlertType } from './alert.model';
import { AlertService } from './alert.service';

@Component({
    selector: 'alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit, OnDestroy {
    @Input() id = 'default-alert';
    @Input() fade = true;

    alerts: Alert[] = [];

    alertSubscription: Subscription | undefined;
    routeSubscription: Subscription | undefined;

    message!: any;
    errorSubscription: Subscription | undefined;

    constructor(
        private router: Router,
        private alertService: AlertService,
        private messageService: MessageService
    ) { }

    ngOnInit() {

        // subscribe to new alert notifications
        this.alertSubscription = this.alertService.onAlert(this.id)
            .subscribe(alert => {

                // clear alerts when an empty alert is received
                if (!alert.message) {

                    console.log("AlertsComponent.ngOnInit.subscribe --> clear alerts")

                    // filter out alerts without 'keepAfterRouteChange' flag
                    this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

                    // remove 'keepAfterRouteChange' flag on the rest
                    this.alerts.forEach(x => delete x.keepAfterRouteChange);
                    return;
                }

                console.log("AlertsComponent.ngOnInit.subscribe --> alert: " + alert.message)

                // add alert to array
                this.alerts.push(alert);

                // auto close alert if required
                if (alert.autoClose) {
                    setTimeout(() =>  
                        this.removeAlert(alert), 3000);
                    
                }
            });

        // clear alerts on location change
        this.routeSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.alertService.clear(this.id);
            }
        });

        this.errorSubscription = this.messageService.currentMessage.subscribe(message => this.message = message)
    }

    ngOnDestroy() {
        // unsubscribe to avoid memory leaks
        this.alertSubscription?.unsubscribe();
        this.routeSubscription?.unsubscribe();
        this.errorSubscription?.unsubscribe();
    }

    showDetails(alert: Alert) {
        console.log("AlertsComponent.onClick")
        if (alert.dump) {
            this.router.navigate(['/error']);            
            this.messageService.changeMessage(alert.dump);
        }
        else {
            console.log("alert has no detail")
        }
    }

    removeAlert(alert: Alert) {
        console.log("removeAlert")

        // check if already removed to prevent error on auto close
        if (!this.alerts.includes(alert)) return;

        if (this.fade) {
            // fade out alert
            console.log("removeAlert: fade out alert")
            this.alerts.find(x => x === alert)!.fade = true;

            // remove alert after faded out
            setTimeout(() => {
                console.log("removeAlert: remove alert after faded out")
                this.alerts = this.alerts.filter(x => x !== alert);
            }, 250);
        } else {
            // remove alert
            this.alerts = this.alerts.filter(x => x !== alert);
        }
    }

    cssClass(alert: Alert) {
        if (!alert) return;

        const classes = ['alert', 'alert-dismissable'];

        const alertTypeClass = {
            [AlertType.Success]: 'bg-green-500 text-white',
            [AlertType.Error]: 'bg-red-500 text-white',
            [AlertType.Info]: 'bg-cyan-500 text-white',
            [AlertType.Warning]: 'bg-orange-300 text-white'
        }

        classes.push(alertTypeClass[alert.type!]);

        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    }
}