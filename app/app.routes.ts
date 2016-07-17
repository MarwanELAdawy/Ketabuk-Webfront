import { provideRouter, RouterConfig }  from '@angular/router';
import { JournalsComponent } from './journals.component';
import { LoginComponent } from './login.component';
import { RegistrationComponent } from './registration.component';

const routes: RouterConfig = [
  {
    path: '',
    component: JournalsComponent
  },
  {
      path: 'login',
      component: LoginComponent
  },
    {
      path: 'register',
      component: RegistrationComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];
