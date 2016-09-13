import { Component, OnInit } from '@angular/core';
import { SuperAuth } from '../supers/super-auth';
import { JournalService } from '../services/journal.service';
import { Journal } from '../models/journal';
import { User } from '../models/user';

@Component({
  selector: 'my-settings',
  templateUrl: 'app/templates/settings.component.html',
  providers: [JournalService ],
})
export class SettingsComponent implements OnInit
{
    private user : User;
    private journalNameChanged: boolean = false;
    private errorMessage: any;

    constructor(private journalService: JournalService){}
  ngOnInit()
  {
    this.setUser();
  }

  setUser()
  {
    this.user = SuperAuth.getAuthenticatedUser();
  }

  changeUserName()
  {

  }

  changeJournalName()
  {
    this.journalService.changeJournalName(this.user.journal.id, this.user.journal.name)
                        .subscribe(
                          response => this.onJournalChanged(response),
                          error => this.errorMessage = error
                        );
  }

  onJournalChanged(response)
  {
    if(response != this.user.journal.name)
      return;
    this.journalNameChanged = true;
    SuperAuth.setAuthenticatedUser(this.user);
  }
}