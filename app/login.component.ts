import { Component, Input } from '@angular/core';
import { LoginService } from './login.service';
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';

Cookie.set('jwt', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJLZXRhYnVrIiwiaWF0IjoxNDcxMzc5MDM0LCJleHAiOjE0NzEzODI2MzQsInN1YiI6Mn0.fdUJjCJL5FWYHWpZwPihl_Jw-mwGETcshlSdGGtx2wQ');

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