import { NgModule }       from '@angular/core';
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

// import { bootstrap }    from '@angular/platform-browser-dynamic';
// import { HTTP_PROVIDERS } from '@angular/http';

// import { AppComponent } from './app.component';
// import { appRouterProviders } from './app.routes';
// import { SuperAuth } from './super-auth';

// bootstrap(AppComponent, [
//   appRouterProviders,
//   HTTP_PROVIDERS,
//   SuperAuth
// ]);