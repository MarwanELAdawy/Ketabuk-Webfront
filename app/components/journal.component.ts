import { Component, OnInit, NgZone, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostService } from '../services/post.service';
import { JournalService } from '../services/journal.service';
import { Post } from '../models/post';
import { Journal } from '../models/journal';
import { User } from '../models/user';
import { SuperAuth } from '../supers/super-auth';

declare var tinymce: any;

@Component({
    selector: 'my-journal',
    templateUrl: 'app/templates/journal.component.html',
    providers: [PostService, JournalService]
})
export class JournalComponent implements OnInit
{
    posts: Post[];
    journal: Journal;
    errorMessage: string;
    sub: any;
    journal_id: number;
    newPostText: string;
    user: User;

    constructor(private postService: PostService,
                private journalService: JournalService,
                private route: ActivatedRoute,
                public zone: NgZone ) {}

    ngOnInit()
    {
        this.sub = this.route.params.subscribe(params => {
        this.journal_id = +params['id'];
        });
        this.getJournal(this.journal_id);
        this.getPosts(this.journal_id);
        this.initTinyMCE();
        this.user = SuperAuth.getAuthenticatedUser();
    }

    initTinyMCE()
    {
        tinymce.init(
        {
            selector: "#post-content",
            plugins: "directionality",
            menubar: false,
            directionality: "rtl",
            content_css : "/app/assets/css/main.css",
            body_class: 'bigger',
            // This writes the content of the post to newPostText in real time.
            setup: (ed) => {
            ed.on('keyup change', (ed, l) => {
                this.zone.run(()=> {
                this.newPostText = tinymce.activeEditor.getContent();
                });
            });

            }
        });
    }

    getJournal(id: number)
    {
        this.journalService.getJournal(id)
                            .subscribe(
                                journal => this.journal = journal,
                                error => this.errorMessage = <any>error);
    }

    getPosts(id: number)
    {
      this.postService.getPosts(id)
                          .subscribe(
                          posts => this.posts = posts,
                          error =>  this.errorMessage = <any>error);
    }

    submitPost()
    {
        this.postService.submitPost(this.journal_id, this.newPostText)
                        .subscribe(
                        response => this.updatePosts(response),
                        error =>  this.errorMessage = <any>error);
        // my dirty workaround to reset the editor content until a proper feature is implemented in angular2
        this.initTinyMCE();
        tinymce.activeEditor.setContent('');
    }

    updatePosts(post: Post)
    {
        // adds the new post to the beginning of the array
        this.posts.unshift(post);
    }

    userMayEdit(user: User)
    {
        if(this.user.email == user.email)
            return true;
        return false;
    }

    deletePost(id)
    {
        this.postService.deletePost(this.journal_id, id)
                        .subscribe(
                            // deletes the post by id returned from server
                            response => this.posts = this.posts.filter(function(el) {
                                return el.id !== response;
                            })
                        );
    }
}