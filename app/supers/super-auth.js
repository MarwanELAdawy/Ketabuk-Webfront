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
var config_1 = require('../config');
var router_1 = require('@angular/router');
var angular2_jwt_1 = require('../angular2-jwt');
var SuperAuth = (function () {
    function SuperAuth(http, router) {
        this.http = http;
        this.router = router;
    }
    SuperAuth.getJWT = function () {
        return localStorage.getItem(config_1.Config.JWT_FIELD_NAME);
    };
    SuperAuth.prototype.canActivate = function (route, state) {
        // if you're logged in and you try to access the login or register page you'll be redirected to /
        if (SuperAuth.isLoggedIn() && (route.url.toString() == 'login' || route.url.toString() == 'register')) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    };
    SuperAuth.prototype.get = function (url) {
        if (SuperAuth.isLoggedIn())
            return this.http.get(url + '?token=' + SuperAuth.getJWT());
        return this.http.get(url);
    };
    SuperAuth.prototype.post = function (url, data, options) {
        if (options === void 0) { options = {}; }
        if (SuperAuth.isLoggedIn())
            return this.http.post(url + '?token=' + SuperAuth.getJWT(), data, options);
        return this.http.post(url, data, options);
    };
    SuperAuth.isLoggedIn = function () {
        var jwt = localStorage.getItem(config_1.Config.JWT_FIELD_NAME);
        if (jwt == null)
            return false;
        var helper = new angular2_jwt_1.JwtHelper;
        if (helper.isTokenExpired(jwt)) {
            SuperAuth.logout();
            return false;
        }
        return true;
    };
    SuperAuth.logout = function () {
        var fields = config_1.Config.ALL_FIELDS;
        fields.forEach(function (element) {
            localStorage.removeItem(element);
        });
        location.href = '/';
    };
    SuperAuth.login = function (response) {
        localStorage.setItem(config_1.Config.USER_FIELD, JSON.stringify(response));
        location.href = '/';
    };
    SuperAuth.getAuthenticatedUser = function () {
        var user = JSON.parse(localStorage.getItem(config_1.Config.USER_FIELD));
        if (user == null)
            return null;
        return user;
    };
    SuperAuth = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SuperAuth);
    return SuperAuth;
}());
exports.SuperAuth = SuperAuth;
//# sourceMappingURL=super-auth.js.map