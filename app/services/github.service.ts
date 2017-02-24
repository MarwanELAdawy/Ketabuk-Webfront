import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Config } from '../config';
import { SuperAuth } from '../supers/super-auth';
import { SuperService } from '../supers/super-service';

@Injectable()
export class GithubService
{
	constructor (private http: SuperAuth)
	{}
	
	private githubWebfrontUrl = Config.GITHUB_API_FRONT_URL;  // URL to github api
	private githubServerUrl = Config.GITHUB_API_BACK_URL;  // URL to github api


	getWebfrontMilestone (): Observable<GithubResponse>
	{
			return this.http.get(this.githubWebfrontUrl)
								 .map(this.extractData)
								 .catch(this.handleError);
	}

	getServerMilestone (): Observable<GithubResponse>
	{
			return this.http.get(this.githubServerUrl)
								 .map(this.extractData)
								 .catch(this.handleError);
	}

	private extractData(response: Response)
	{
		let body = response.json();
		return body || { };
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

//  how to github reponse looks like: https://developer.github.com/v3/issues/milestones/
export class GithubResponse
{
		url: string;
		html_url: string;
		labels_url: string;
		id: number;
		state: string;
		title: string;
		description: string;
		creator: GithubUser;
		open_issues: number;
		closed_issues: number;
		created_at: string;
		updated_at: string;
		closed_at: string;
		due_on: string;
}

export class GithubUser
{
	login: string;
	id: number;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
}