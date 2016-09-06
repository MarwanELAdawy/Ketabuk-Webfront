import { NgModule, enableProdMode }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'

import { routing } from './app.routes';
import { SuperAuth } from './super-auth';

import { HomeComponent } from './home.component';
import { JournalComponent } from './journal.component';
import { LoginComponent } from './login.component';
import { RegistrationComponent } from './registration.component';
import { EditorDirective } from './tinyMCE.directive';
import { Config } from './config';

if(Config.IN_PRODUCTION)
    enableProdMode();

@NgModule({
    declarations: [
                    AppComponent,
                    HomeComponent,
                    JournalComponent,
                    LoginComponent,
                    RegistrationComponent,
                    EditorDirective
                  ],
    providers: [
        SuperAuth
    ],
    imports:      [
                    BrowserModule,
                    HttpModule,
                    FormsModule,
                    RouterModule,
                    routing,
                  ],
    bootstrap:    [AppComponent],
})
export class AppModule {}