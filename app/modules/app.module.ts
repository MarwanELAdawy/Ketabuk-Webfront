import { NgModule, enableProdMode }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from '../components/app.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'

import { routing } from '../app.routes';
import { SuperAuth } from '../supers/super-auth';

import { HomeComponent } from '../components/home.component';
import { JournalComponent } from '../components/journal.component';
import { LoginComponent } from '../components/login.component';
import { RegistrationComponent } from '../components/registration.component';
import { SettingsComponent } from '../components/settings.component';
import { NotificationComponent } from '../components/notification.component';
import { EditorDirective } from '../directives/tinyMCE.directive';
import { Config } from '../config';

if(Config.IN_PRODUCTION)
	enableProdMode();

@NgModule({
	declarations: [
					AppComponent,
					HomeComponent,
					JournalComponent,
					LoginComponent,
					RegistrationComponent,
					SettingsComponent,
					NotificationComponent,
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