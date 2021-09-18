import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyMaterialModule } from './utilities/mymaterial.module';
import { HeadersModule } from './headers/headers.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { JwtInterceptor } from './utilities/jwtinterceptor';
import { ErrorInterceptor } from './utilities/errorinterceptor';
import { AuthorisationModule } from './authorisation/authorisation.module';
import { PeopleModule } from './people/people.module';
import { PlayersModule } from './players/players.module';
import { WaitersModule } from './waiters/waiters.module';
import { DumpModule } from './dump/dump.module';
import { CourtsModule } from './courts/courts.module';
import { AlertsModule } from './alert/alerts.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        ScrollingModule,
        MyMaterialModule,
        DumpModule,
        AlertsModule,
        HeadersModule,
        AuthorisationModule,
        PeopleModule,
        PlayersModule,
        WaitersModule,
        CourtsModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      ],
    bootstrap: [AppComponent]
})
export class AppModule { }
