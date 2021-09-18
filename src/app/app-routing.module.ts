import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPage } from './authorisation/register-page/register.page';
import { SigninPage } from './authorisation/signin-page/signin.page';
import { PlayersPageComponent } from './players/page/players.page';
import { DumpPageComponent } from './dump/page/dump.page';
import { AuthGuard } from './utilities/auth.guard';
import { WaitersPageComponent } from './waiters/page/waiters.page';
import { CourtsPageComponent } from './courts/courts/courts.page/courts.page';
import { CourtPageComponent } from './courts/court/court.page/court-page.component';
import { NewCourtPageComponent } from './courts/new/newcourt.page/newcourt-page.component';
import { PeoplePageComponent } from './people/people/people.page/people.page';
import { PersonPageComponent } from './people/person/person.page/person-page.component';
import { AccountPageComponent } from './people/account/account.page/account-page.component';

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
          { path: '', component: NewCourtPageComponent },
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
