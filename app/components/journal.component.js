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
var router_1 = require('@angular/router');
var post_service_1 = require('../services/post.service');
var journal_service_1 = require('../services/journal.service');
var super_auth_1 = require('../supers/super-auth');
var JournalComponent = (function () {
    function JournalComponent(postService, journalService, route, zone) {
        this.postService = postService;
        this.journalService = journalService;
        this.route = route;
        this.zone = zone;
    }
    JournalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.journal_id = +params['id'];
        });
        this.getJournal(this.journal_id);
        this.getPosts(this.journal_id);
        this.initTinyMCE();
        this.user = super_auth_1.SuperAuth.getAuthenticatedUser();
    };
    JournalComponent.prototype.initTinyMCE = function () {
        var _this = this;
        tinymce.init({
            selector: "#post-content",
            plugins: "directionality",
            menubar: false,
            directionality: "rtl",
            content_css: "/app/assets/css/main.css",
            body_class: 'bigger',
            // This writes the content of the post to newPostText in real time.
            setup: function (ed) {
                ed.on('keyup change', function (ed, l) {
                    _this.zone.run(function () {
                        _this.newPostText = tinymce.activeEditor.getContent();
                    });
                });
            }
        });
    };
    JournalComponent.prototype.getJournal = function (id) {
        var _this = this;
        this.journalService.getJournal(id)
            .subscribe(function (journal) { return _this.journal = journal; }, function (error) { return _this.errorMessage = error; });
    };
    JournalComponent.prototype.getPosts = function (id) {
        var _this = this;
        this.postService.getPosts(id)
            .subscribe(function (posts) { return _this.posts = posts; }, function (error) { return _this.errorMessage = error; });
    };
    JournalComponent.prototype.submitPost = function () {
        var _this = this;
        this.postService.submitPost(this.journal_id, this.newPostText)
            .subscribe(function (response) { return _this.updatePosts(response); }, function (error) { return _this.errorMessage = error; });
        // my dirty workaround to reset the editor content until a proper feature is implemented in angular2
        this.initTinyMCE();
        tinymce.activeEditor.setContent('');
    };
    JournalComponent.prototype.updatePosts = function (post) {
        // adds the new post to the beginning of the array
        this.posts.unshift(post);
    };
    JournalComponent.prototype.userMayEdit = function (user) {
        if (this.user.email == user.email)
            return true;
        return false;
    };
    JournalComponent = __decorate([
        core_1.Component({
            selector: 'my-journal',
            templateUrl: 'app/templates/journal.component.html',
            providers: [post_service_1.PostService, journal_service_1.JournalService]
        }), 
        __metadata('design:paramtypes', [post_service_1.PostService, journal_service_1.JournalService, router_1.ActivatedRoute, core_1.NgZone])
    ], JournalComponent);
    return JournalComponent;
}());
exports.JournalComponent = JournalComponent;
//# sourceMappingURL=journal.component.js.map