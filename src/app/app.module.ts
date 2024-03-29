import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeadersModule } from './headers/headers.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { JwtInterceptor } from './utilities/jwtinterceptor';
import { ErrorInterceptor } from './utilities/errorinterceptor';
import { AuthorisationModule } from './mqtthandler/authentication/authorisation.module';
import { DumpModule } from './dump/dump.module';
import { AlertsModule } from './alert/alerts.module';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { environment } from 'src/environments/environment';
import { PeopleModule } from './mqtthandler/people/people.module';
import { WaitersModule } from './mqtthandler/waiters/waiters.module';
import { CourtsModule } from './mqtthandler/courts/courts.module';
import { SettingsModule } from './mqtthandler/settings/settings.module';
import { GameEditModule } from './mqtthandler/game-edit/game-edit.module';
import { GamesViewModule } from './mqtthandler/games-view/games-view.module';
import { SharedDataService } from './service/game.service';
import { ViewerModule } from './mqtthandler/viewer/viewer.module';

const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: environment.mqtt.server,
  port: environment.mqtt.port,
  clean: false,
  protocol: (environment.mqtt.protocol === "wss") ? "wss" : "ws",
  path: environment.mqtt.path,
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ScrollingModule,
    DumpModule,
    AlertsModule,
    HeadersModule,
    AuthorisationModule,
    PeopleModule,
    GamesViewModule,
    WaitersModule,
    CourtsModule,
    HttpClientModule,
    SettingsModule,
    GameEditModule,
    GamesViewModule,
    ViewerModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    SharedDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
