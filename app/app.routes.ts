import { provideRouter, RouterConfig }  from '@angular/router';
import { HomeComponent } from './home.component';
import { JournalComponent } from './journal.component';
import { LoginComponent } from './login.component';
import { RegistrationComponent } from './registration.component';

const routes: RouterConfig = [
  {
    path: '',
    component: HomeComponent
  },
  {
      path: 'login',
      component: LoginComponent
  },
    {
      path: 'register',
      component: RegistrationComponent
  },
  {
    path: 'journal/:id',
    component: JournalComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];

