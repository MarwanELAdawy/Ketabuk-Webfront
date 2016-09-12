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
//import { RuntimeCompiler} from '@angular/compiler';
var journal_service_1 = require('../services/journal.service');
var super_auth_1 = require('../supers/super-auth');
var HomeComponent = (function () {
    function HomeComponent(journalService) {
        this.journalService = journalService;
    } //, private _runtimeCompiler: RuntimeCompiler) {}
    HomeComponent.prototype.ngOnInit = function () {
        if (this.isLoggedIn = super_auth_1.SuperAuth.isLoggedIn())
            this.getJournals();
    };
    HomeComponent.prototype.getJournals = function () {
        var _this = this;
        this.journalService.getJournals()
            .subscribe(function (journals) { return _this.journals = journals; }, function (error) { return _this.errorMessage = error; });
    };
    HomeComponent.prototype.getMyJournal = function () {
        this.journalService.getMyJournal();
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: 'app/templates/home.component.html',
            providers: [journal_service_1.JournalService]
        }), 
        __metadata('design:paramtypes', [journal_service_1.JournalService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map