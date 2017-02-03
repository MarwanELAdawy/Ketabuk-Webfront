import { Component, Input } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from '../models/user';
import { Config } from '../config';
import { SuperAuth } from '../supers/super-auth';

@Component(
	{
		selector: 'my-login',
		templateUrl: 'app/templates/login.component.html',
		providers: [LoginService]
	}
)
export class LoginComponent
{
	@Input() email: string;
	@Input() password: string;

	user: User;
	errorMessage: any;

	constructor(private loginService: LoginService, private http: Http) {}
	login()
	{
		this.loginService.login([this.email, this.password])
							.subscribe(
							response => SuperAuth.login(response),
							error =>  this.errorMessage = <any>error);
	}
}