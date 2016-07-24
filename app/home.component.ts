import { Component, OnInit } from '@angular/core';

import { HomeService } from './home.service';
import { Journal } from './journal';

@Component({
    selector: 'home',
    templateUrl: 'app/home.component.html',
    providers: [HomeService]
})
export class HomeComponent implements OnInit
{
    journals: Journal[];
    errorMessage: string;

    constructor(private homeService: HomeService) {}

    ngOnInit() { this.getJournals(); }

    getJournals()
    {
      this.homeService.getJournals()
                          .subscribe(
                          journals => this.journals = journals,
                          error =>  this.errorMessage = <any>error);
    }
}