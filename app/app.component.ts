import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { HomeComponent } from './home.component';
import { JournalComponent } from './journal.component'
import { LoginComponent } from './login.component';
import { RegistrationComponent } from './registration.component';
import { SuperAuth } from './super-auth';
import { Config } from './config';
import { Journal } from './journal';
import { User } from './user';

import './rxjs-operators';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: [HomeComponent, LoginComponent, RegistrationComponent, ROUTER_DIRECTIVES],
  providers: [ HTTP_PROVIDERS, SuperAuth ],
  precompile: [HomeComponent, LoginComponent, RegistrationComponent, JournalComponent]
})
export class AppComponent implements OnInit
{
  private m_isLoggedIn : boolean;
  private myJournalLink : string;
  private journal : Journal;
  private user : User;

  ngOnInit()
  {
    this.isLoggedIn();
    if(this.m_isLoggedIn)
      this.setUser();
  }

  isLoggedIn()
  {
    this.m_isLoggedIn = SuperAuth.isLoggedIn();
  }

  logout()
  {
    SuperAuth.logout();
  }

  setUser()
  {
    this.user = JSON.parse( localStorage.getItem(Config.USER_FIELD) );
  }
}