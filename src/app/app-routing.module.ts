import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPage } from './mqtthandler/authentication/register/register-page/register.page';
import { SigninPage } from './mqtthandler/authentication/signin/signin-page/signin.page';
import { DumpPageComponent } from './dump/page/dump.page';
import { CourtPageComponent } from './mqtthandler/courts/court/court.page/court-page.component';
import { CourtsPageComponent } from './mqtthandler/courts/courts/courts.page/courts.page';
import { CreateCourtPageComponent } from './mqtthandler/courts/create/createcourt.page/createcourt-page.component';
import { AccountPageComponent } from './mqtthandler/people/account/account.page/account-page.component';
import { PeoplePageComponent } from './mqtthandler/people/people/people.page/people.page';
import { PersonPageComponent } from './mqtthandler/people/person/person.page/person-page.component';
import { PlayersPageComponent } from './mqtthandler/players/page/players.page';
import { WaitersPageComponent } from './mqtthandler/waiters/page/waiters.page';
import { AuthGuard } from './utilities/auth.guard';
import { SettingsPageComponent } from './mqtthandler/settings/settings.page/settings.page';

const routes: Routes = [
  { path: '', redirectTo: 'app/courts', pathMatch: 'full' },
  {
    path: 'error',
    children: [
      { path: '', component: DumpPageComponent },
    ]
  },
  {
    path: 'account',
    children: [
      { path: 'signin', component: SigninPage },
      { path: 'register', component: RegisterPage },
    ]
  },
  {
    path: 'app',
    children: [
      {
        path: 'players', canActivate: [AuthGuard],
        children: [
          { path: '', component: PlayersPageComponent },
          { path: ':id', component: PlayersPageComponent },
          //     { path: 'add', component: CourtComponent },
          //     { path: 'edit/:id', component: CourteditComponent },
        ]
      },
      {
        path: 'waiters', canActivate: [AuthGuard],
        children: [
          { path: '', component: WaitersPageComponent },
        ]
      },
      {
        path: 'courts', canActivate: [AuthGuard],
        children: [
          { path: '', component: CourtsPageComponent },
          { path: ':id', component: CourtPageComponent }
        ]
      },
      {
        path: 'newcourt', canActivate: [AuthGuard],
        children: [
          { path: '', component: CreateCourtPageComponent },
        ]
      },
      {
        path: 'people', canActivate: [AuthGuard],
        children: [
          { path: '', component: PeoplePageComponent },
          { path: ':id', component: PersonPageComponent }
        ]
      },
      {
        path: 'account', canActivate: [AuthGuard],
        children: [
          { path: '', component: AccountPageComponent },
        ]
      },
      {
        path: 'settings', canActivate: [AuthGuard],
        children: [
          { path: '', component: SettingsPageComponent },
        ]
      }
    ]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
