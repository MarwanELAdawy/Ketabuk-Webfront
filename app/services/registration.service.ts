import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Journal }           from '../models/journal';
import { Observable }     from 'rxjs/Observable';
import { Config } from '../config';
import { User } from '../models/user';
import { SuperService } from '../supers/super-service';

@Injectable()
export class RegistrationService
{
	constructor (private http: Http)
	{
	}

	private registrationUrl = Config.API_URL + 'register';  // URL to web API

	register (registrationForm: RegistrationForm): Observable<User>
	{
		let body = JSON.stringify({ registrationForm });
		//TODO: remove at production
		console.log(body);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http.post(this.registrationUrl, body, options)
										.map(this.extractData)
										.catch(this.handleError);
	}

	private extractData(response: Response)
	{
		SuperService.extractData(response);
		let body = response.json();
		return body.user;
	}

	private handleError (error: any)
	{
		// In a real world app, we might use a remote logging infrastructure
		// We'd also dig deeper into the error to get a better message
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // log to console instead
		return Observable.throw(errMsg);
	}
}

export class RegistrationForm
{
		user : User;
		email : string;
		password : string;
}