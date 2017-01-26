import { Injectable }     from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Post }           from '../models/post';
import { Observable }     from 'rxjs/Observable';
import { Config }         from '../config';
import { SuperAuth }      from '../supers/super-auth';
import { SuperService }      from '../supers/super-service';

@Injectable()
export class PostService
{
	constructor (private http: SuperAuth) {}

	private postsUrl = Config.API_URL + 'journal';  // URL to web API

	getPosts(journal_id: number): Observable<Post[]>
	{
		return this.http.get(this.postsUrl + '/' + journal_id + '/post')
										.map(this.extractData)
										.catch(this.handleError);
	}

	submitPost(journal_id: number, data: string): Observable<Post>
	{
		let body = JSON.stringify({ data });
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		let url = this.postsUrl + '/' + journal_id + '/post';
		return this.http.post(url, body, options)
										.map(this.extractData)
										.catch(this.handleError);
	}

	deletePost(journal_id, post_id)
	{
		return this.http.delete(this.postsUrl + '/' + journal_id + '/post/' + post_id)
										.map(this.extractData)
										.catch(this.handleError);
	}

	private extractData(response: Response)
	{
		SuperService.extractData(response);
		let body = response.json();
		return body.posts || body.post || body.post_id || { };
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
