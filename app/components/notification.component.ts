import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { SuperAuth } from '../supers/super-auth';
import { Config } from '../config';
import { User } from '../models/user';

import '../rxjs-operators';

@Component({
	selector: 'my-notification',
	templateUrl: 'app/templates/notification.component.html',
	providers: [ SuperAuth, NotificationService ],
})
export class NotificationComponent implements OnInit
{
	notifications: any;
	errorMessage: string;

	private user : User;

	constructor(private notificationService: NotificationService) {}

	ngOnInit()
	{
		this.getNotifications();
		this.setUser();
	}

	getNotifications()
	{
	  this.notificationService.getNotifications()
						  .subscribe(
						  notifications => this.notifications = notifications,
						  error =>  this.errorMessage = <any>error);
	}

	setUser()
	{
		this.user = SuperAuth.getAuthenticatedUser();
	}
}