import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { JournalComponent } from './journal.component';
import { LoginComponent } from './login.component';
import { RegistrationComponent } from './registration.component';
import { SuperAuth } from './super-auth';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
      path: 'login',
      component: LoginComponent,
      canActivate: [SuperAuth]
  },
    {
      path: 'register',
      component: RegistrationComponent,
      canActivate: [SuperAuth]
  },
  {
    path: 'journal/:id',
    component: JournalComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);