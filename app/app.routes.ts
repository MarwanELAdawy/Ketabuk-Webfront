import { provideRouter, RouterConfig }  from '@angular/router';
import { JournalsComponent } from './journals.component';

const routes: RouterConfig = [
  {
    path: '',
    component: JournalsComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];
