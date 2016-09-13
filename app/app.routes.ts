import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { JournalComponent } from './components/journal.component';
import { LoginComponent } from './components/login.component';
import { SettingsComponent } from './components/settings.component';
import { RegistrationComponent } from './components/registration.component';
import { SuperAuth } from './supers/super-auth';

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
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);