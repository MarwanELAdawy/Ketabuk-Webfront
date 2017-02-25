import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { SuperAuth } from '../supers/super-auth';
import { Config } from '../config';
import { User } from '../models/user';

import '../rxjs-operators';

@Component({
	selector: 'my-notification',
	templateUrl: 'app/templates/notification.component.html?v=' + Config.APP_VERSION,
	providers: [ SuperAuth, NotificationService ],
})
export class NotificationComponent implements OnInit
{
	notifications: any[] = [];
	unReadNotifications: any[] = [];
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
						  notifications => this.handleNotifications(notifications),
						  error =>  this.errorMessage = <any>error);
	}

	setUser()
	{
		this.user = SuperAuth.getAuthenticatedUser();
	}

	handleNotifications(notifications: any[])
	{
		notifications.forEach(notification => {
			if (notification.read_at) this.notifications.push(notification);
			else this.unReadNotifications.push(notification);
		});
	}

	onClick()
	{
		if (this.unReadNotifications.length > 0)
			this.notificationService.markNotificationsRead()
			.subscribe(
				whatever => this.handleNotificationsRead(whatever),
				error => this.errorMessage = <any>error);
	}

	handleNotificationsRead(whatever: any)
	{
		this.notifications = this.notifications.concat(this.unReadNotifications);
		this.unReadNotifications = [];
	}
}