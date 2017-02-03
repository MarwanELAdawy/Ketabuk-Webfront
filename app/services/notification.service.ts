import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Config } from '../config';
import { SuperAuth } from '../supers/super-auth';
import { SuperService } from '../supers/super-service';

@Injectable()
export class NotificationService
{
	constructor (private http: SuperAuth)
	{}
	
	private notificationsUrl = Config.API_URL + 'notifications';  // URL to web API
	
	getNotifications (): Observable<any>
	{
			return this.http.get(this.notificationsUrl)
								 .map(this.extractData)
								 .catch(this.handleError);
	}

	private extractData(response: Response)
	{
		SuperService.extractData(response);
		let body = response.json();
		return body.notifications || { };
	}

	private handleError (error: any)
	{
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // log to console instead
		return Observable.throw(errMsg);
	}

}
