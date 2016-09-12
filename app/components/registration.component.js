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
var user_1 = require('../models/user');
var journal_1 = require('../models/journal');
var registration_service_1 = require('../services/registration.service');
var super_auth_1 = require('../supers/super-auth');
var RegistrationComponent // implements OnInit
 = (function () {
    function RegistrationComponent // implements OnInit
        (registerationService) {
        this.registerationService = registerationService;
        this.valid = false;
        this.submitted = false;
        this.form = new registration_service_1.RegistrationForm;
        this.form.user = new user_1.User;
        this.form.user.journal = new journal_1.Journal;
        this.journalModified = false;
        this.form.user.journal.name = '';
    }
    // ngOnInit()
    // {
    // }
    RegistrationComponent // implements OnInit
    .prototype.setJournalModified = function ($event) {
        this.journalModified = true;
    };
    RegistrationComponent // implements OnInit
    .prototype.setJournalName = function ($event) {
        this.form.user.journal.name = "كـتـاب " + this.form.user.name;
    };
    RegistrationComponent // implements OnInit
    .prototype.comparePasswords = function () {
        if (this.form.password == this.password) {
            this.valid = true;
            return;
        }
        this.valid = false;
    };
    RegistrationComponent // implements OnInit
    .prototype.register = function () {
        var _this = this;
        if (this.valid) {
            this.registerationService.register(this.form)
                .subscribe(function (response) { return super_auth_1.SuperAuth.login(response); }, function (error) { return _this.errorMessage = error; });
        }
        this.submitted = true;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', registration_service_1.RegistrationForm)
    ], RegistrationComponent // implements OnInit
    .prototype, "form", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RegistrationComponent // implements OnInit
    .prototype, "journalModified", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RegistrationComponent // implements OnInit
    .prototype, "journalName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RegistrationComponent // implements OnInit
    .prototype, "password", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RegistrationComponent // implements OnInit
    .prototype, "valid", void 0);
    RegistrationComponent // implements OnInit
     = __decorate([
        core_1.Component({
            selector: 'my-login',
            templateUrl: 'app/templates/registration.component.html',
            providers: [registration_service_1.RegistrationService]
        }), 
        __metadata('design:paramtypes', [registration_service_1.RegistrationService])
    ], RegistrationComponent // implements OnInit
    );
    return RegistrationComponent // implements OnInit
    ;
}());
exports.RegistrationComponent // implements OnInit
 = RegistrationComponent // implements OnInit
;
//# sourceMappingURL=registration.component.js.map