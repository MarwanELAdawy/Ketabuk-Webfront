import { Component, Input } from '@angular/core';
import { LoginService } from './login.service';
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from './user';
import { Config } from './config';

@Component(
    {
        selector: 'my-login',
        templateUrl: 'app/login.component.html',
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
                            response => this.onLogin(response),
                            error =>  this.errorMessage = <any>error);
    }

    onLogin(response)
    {
        this.user = response;
        localStorage.setItem( Config.USER_FIELD, JSON.stringify(this.user) );
    }
}