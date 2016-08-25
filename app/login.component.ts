import { Component, Input } from '@angular/core';
import { LoginService } from './login.service';
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

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

    response: string;
    errorMessage: any;

    constructor(private loginService: LoginService, private http: Http) {}
    login()
    {
        this.loginService.login([this.email, this.password])
                            .subscribe(
                          response => this.response = response,
                          error =>  this.errorMessage = <any>error);
    }
}