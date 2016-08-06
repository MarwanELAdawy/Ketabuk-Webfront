import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostService } from './post.service';
import { JournalService } from './journal.service';
import { Post } from './post';
import { Journal } from './journal';

@Component({
    selector: 'my-journal',
    templateUrl: 'app/journal.component.html',
    providers: [PostService, JournalService]
})
export class JournalComponent implements OnInit
{
    posts: Post[];
    journal: Journal;
    errorMessage: string;
    sub: any;
    journal_id: number;

    constructor(private postService: PostService,
                private journalService: JournalService,
                private route: ActivatedRoute ) {}

    ngOnInit()
    {
        this.sub = this.route.params.subscribe(params => {
        this.journal_id = +params['id'];
        });
        this.getJournal(this.journal_id);
        this.getPosts(this.journal_id);
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
}