import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from '../account/account.service';
import { Router } from '@angular/router';
import { AlertService } from '../_alert';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private accountService: AccountService,
        private router: Router,
        private alertService: AlertService
    ) { }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(request).pipe(

            catchError((error) => {
                let handled: boolean = false;

                if (error instanceof HttpErrorResponse) {
                    if (error.error instanceof ErrorEvent) {
                        console.error("ErrorInterceptor: ErrorEvent");
                    } else {
                        switch (error.status) {
                            case 401:
                                this.alertService.error("Username or password not valid")                          
                                this.router.navigateByUrl("account/signin");
                                handled = true;
                                break;
                            case 403:
                                this.alertService.error("Forbidden")                             
                                this.router.navigateByUrl("/unauthorized");
                                handled = true;
                                break;
                        }
                    } 
                } else {
                    console.error("ErrorInterceptor: something bad happened");                     
                }

                if (handled) {
                    return of(error);                    
                } else { 
                    return throwError(error);                    
                }
            })
        )
    }
}
