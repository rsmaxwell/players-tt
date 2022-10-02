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
import { AuthorisationModule } from './mqtthandler/authentication/authorisation.module';
import { DumpModule } from './dump/dump.module';
import { AlertsModule } from './alert/alerts.module';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { environment } from 'src/environments/environment';
import { PeopleModule } from './mqtthandler/people/people.module';
import { PlayersModule } from './mqtthandler/players/players.module';
import { WaitersModule } from './mqtthandler/waiters/waiters.module';
import { CourtsModule } from './mqtthandler/courts/courts.module';
import { SettingsModule } from './mqtthandler/settings/settings.module';

const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: environment.mqtt.server,
  port: environment.mqtt.port,
  protocol: (environment.mqtt.protocol === "wss") ? "wss" : "ws",
  path: environment.mqtt.path,
};

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        AppRoutingModule,
        ScrollingModule,
        MyMaterialModule,
        DumpModule,
        AlertsModule,
        HeadersModule,
        AuthorisationModule,
        PeopleModule,
        PlayersModule,
        WaitersModule,
        CourtsModule,
        HttpClientModule,
        SettingsModule,
        MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
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
