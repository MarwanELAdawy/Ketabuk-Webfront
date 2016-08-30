import { Component, OnInit } from '@angular/core';
//import { RuntimeCompiler} from '@angular/compiler';

import { JournalService } from './journal.service';
import { Journal } from './journal';
import { SuperAuth } from './super-auth';

@Component({
    selector: 'home',
    templateUrl: 'app/home.component.html',
    providers: [JournalService]
})
export class HomeComponent implements OnInit
{
    journals: Journal[];
    errorMessage: string;

    constructor(private journalService: JournalService){}//, private _runtimeCompiler: RuntimeCompiler) {}
    

    ngOnInit()
    {
        if (SuperAuth.isLoggedIn())
            this.getJournals();

        //TODO: comment out in production
        // this._runtimeCompiler.clearCache();
    }

    getJournals()
    {
      this.journalService.getJournals()
                          .subscribe(
                          journals => this.journals = journals,
                          error =>  this.errorMessage = <any>error);
    }

    getMyJournal()
    {
        this.journalService.getMyJournal();
    }
}