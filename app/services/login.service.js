"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var config_1 = require('../config');
var super_service_1 = require('../supers/super-service');
var LoginService = (function () {
    function LoginService(http) {
        this.http = http;
        this.loginUrl = config_1.Config.API_URL + 'login'; // URL to web API
    }
    LoginService.prototype.login = function (p_credentials) {
        var credentials = new Credentials;
        credentials.email = p_credentials[0];
        credentials.password = p_credentials[1];
        var body = JSON.stringify({ credentials: credentials });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.loginUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    LoginService.prototype.extractData = function (response) {
        super_service_1.SuperService.extractData(response);
        var body = response.json();
        return body.user;
    };
    LoginService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
var Credentials = (function () {
    function Credentials() {
    }
    return Credentials;
}());
//# sourceMappingURL=login.service.js.map