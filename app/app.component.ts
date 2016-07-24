import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { RegistrationComponent } from './registration.component';

import './rxjs-operators';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: [HomeComponent, LoginComponent, RegistrationComponent, ROUTER_DIRECTIVES],
  providers: [ HTTP_PROVIDERS ],
  precompile: [HomeComponent, LoginComponent, RegistrationComponent]
})
export class AppComponent { }