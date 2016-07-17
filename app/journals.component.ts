import { Component, OnInit } from '@angular/core';

import { JournalsService } from './journals.service';
import { Journal } from './journal';

@Component({
    selector: 'my-journals',
    templateUrl: 'app/journals.component.html',
    providers: [JournalsService]
})
export class JournalsComponent implements OnInit
{
    journals: Journal[];
    errorMessage: string;

    constructor(private journalsService: JournalsService) {}

    ngOnInit() { this.getJournals(); }

    getJournals()
    {
      this.journalsService.getJournals()
                          .subscribe(
                          journals => this.journals = journals,
                          error =>  this.errorMessage = <any>error);
    }
}