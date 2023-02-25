import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from './alert.model';
import { AlertBuilder } from './alertbuilder';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<Alert>();

    private publish(alert: Alert) {
        this.subject.next(alert);
    }

    success(message: string) {
        console.log("AlertService.success")
        this.publish(new AlertBuilder().message(message).success().build()) 
    }

    error(message: string) {
        this.publish(new AlertBuilder().message(message).error().build()) 
    }

    info(message: string) {
        this.publish(new AlertBuilder().message(message).info().build()) 
    }

    warning(message: string) {
        this.publish(new AlertBuilder().message(message).warning().build()) 
    }

    errorDump(message: string, data: any) {
        this.publish(new AlertBuilder().message(message).error().dump(data).build())
    }

    onAlert(id = Alert.defaultId): Observable<Alert> {
        console.log("AlertService.onAlert")
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    clear(id = Alert.defaultId) {
        this.subject.next(new AlertBuilder().id(id).build());
    }
}

