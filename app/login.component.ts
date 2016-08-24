import { Component } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

Cookie.set('jwt', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJLZXRhYnVrIiwiaWF0IjoxNDcxMzc5MDM0LCJleHAiOjE0NzEzODI2MzQsInN1YiI6Mn0.fdUJjCJL5FWYHWpZwPihl_Jw-mwGETcshlSdGGtx2wQ');

@Component(
    {
        selector: 'my-login',
        templateUrl: 'app/login.component.html'
    }
)
export class LoginComponent
{
    loginlink: string;

    constructor()
    {
        this.loginlink = 'api.ketabuk.dev/login';
    }
}