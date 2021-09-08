import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPage } from './authorisation/register-page/register.page';
import { SigninPage } from './authorisation/signin-page/signin.page';
import { CourtsPageComponent } from './courts/page/courts.page';
import { DumpPageComponent } from './dump/page/dump.page';
import { PeoplePageComponent } from './people/people.page/people.page';
import { PersonPageComponent } from './people/person.page/person-page.component';
import { AuthGuard } from './utilities/auth.guard';
import { WaitersPageComponent } from './waiters/page/waiters.page';

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
        path: 'waiters', canActivate: [AuthGuard],
        children: [
          { path: '', component: WaitersPageComponent },
        ]
      },
      {
        path: 'courts', canActivate: [AuthGuard],
        children: [
          { path: '', component: CourtsPageComponent },
          { path: ':id', component: CourtsPageComponent },
          //     { path: 'add', component: CourtComponent },
          //     { path: 'edit/:id', component: CourteditComponent },
        ]
      },
      {
        path: 'people', canActivate: [AuthGuard],
        children: [
          { path: '', component: PeoplePageComponent },
          { path: ':id', component: PersonPageComponent },
          //     { path: 'add', component: PersonEditComponent },
          //     { path: 'edit:id', component: PersonEditComponent },
        ]
      },
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
