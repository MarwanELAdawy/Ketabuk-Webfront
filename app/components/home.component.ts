import { Component, OnInit } from '@angular/core';
//import { RuntimeCompiler} from '@angular/compiler';

import { JournalService } from '../services/journal.service';
import { GithubService } from '../services/github.service';
import { Journal } from '../models/journal';
import { SuperAuth } from '../supers/super-auth';

@Component({
    selector: 'home',
    templateUrl: 'app/templates/home.component.html',
    providers: [JournalService, GithubService]
})
export class HomeComponent implements OnInit
{
    journals: Journal[];
    open_issues: number;
    closed_issues: number;
    issues_ratio: string;
    errorMessage: string;
    isLoggedIn: boolean;
    constructor(private journalService: JournalService, private githubService: GithubService){}//, private _runtimeCompiler: RuntimeCompiler) {}
    

    ngOnInit()
    {
        if (this.isLoggedIn = SuperAuth.isLoggedIn())
            this.getJournals();
        else
        {
            this.closed_issues = 0;
            this.open_issues = 0;
            this.getMilestoneProgress();
        }
    }

    getJournals()
    {
      this.journalService.getJournals()
                          .subscribe(
                          journals => this.journals = journals,
                          error =>  this.errorMessage = <any>error);
    }

    getMilestoneProgress()
    {
        this.githubService.getWebfrontMilestone()
                          .subscribe(
                              response => this._MilestoneProgressCallback(response),
                              error =>  this.errorMessage = <any>error);
        this.githubService.getServerMilestone()
                          .subscribe(
                              response => this._MilestoneProgressCallback(response),
                              error =>  this.errorMessage = <any>error);
    }

    _MilestoneProgressCallback(response)
    {
        this.open_issues += response.open_issues;
        this.closed_issues += response.closed_issues;
        var tmp =  100 * (this.closed_issues / (this.open_issues + this.closed_issues));
        this.issues_ratio = tmp.toFixed().toString() + "%";
    }
}