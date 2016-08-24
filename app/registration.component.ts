import { Component, Input } from '@angular/core';
import { User } from './user';

@Component(
    {
        selector: 'my-login',
        templateUrl: 'app/registration.component.html'
    }
)
export class RegistrationComponent
{
    @Input() user : User;
    @Input() journalModified: boolean;
    @Input() journalName: string;

    constructor(){
        this.user = new User;
        this.journalModified = false;
        this.journalName = '';
    }

    setJournalModified($event)
    {
        this.journalModified = true;
    }

    setJournalName($event)
    {
        //if (!this.journalModified && this.user.name)
            this.journalName = "كراسة " + this.user.name;
    }
}