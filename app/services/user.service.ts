import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Config } from '../config';
import { SuperAuth } from '../supers/super-auth';
import { SuperService } from '../supers/super-service';

@Injectable()
export class UserService
{
	private jwt: string;
	constructor (private http: SuperAuth)
	{}

	private userUrl = Config.API_URL + 'user';  // URL to web API

	changeUserName(value: string)
	{
			return this.http.put(this.userUrl, value)
										.map(this.extractData)
										.catch(this.handleError);
	}

	private extractData(response: Response)
	{
		SuperService.extractData(response);
		let body = response.json();
		return body.username || { };
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
