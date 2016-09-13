import { Component, OnInit } from '@angular/core';
import { SuperAuth } from '../supers/super-auth';
import { JournalService } from '../services/journal.service';
import { UserService } from '../services/user.service';
import { Journal } from '../models/journal';
import { User } from '../models/user';

@Component({
  selector: 'my-settings',
  templateUrl: 'app/templates/settings.component.html',
  providers: [JournalService, UserService ],
})
export class SettingsComponent implements OnInit
{
    private user : User;
    private journalNameChanged: boolean = false;
    private userNameChanged: boolean = false;
    private errorMessage: any;

    constructor(private journalService: JournalService, private userService: UserService){}
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
      this.userService.changeUserName(this.user.name)
                        .subscribe(
                          response => this.onUserChanged(response),
                          error => this.errorMessage = error
                        );
  }

  onUserChanged(response)
  {
    if(response != this.user.name)
      return;
    this.userNameChanged = true;
    SuperAuth.setAuthenticatedUser(this.user);
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