import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Journal }           from '../models/journal';
import { Observable }     from 'rxjs/Observable';
import { Config } from '../config';
import { SuperAuth } from '../supers/super-auth';
import { SuperService } from '../supers/super-service';

@Injectable()
export class GithubService
{
  constructor (private http: SuperAuth)
  {}

  private githubWebfrontUrl = 'https://api.github.com/repos/Ketabuk/Ketabuk-Webfront/milestones/1';  // URL to github api
  private githubServerUrl = 'https://api.github.com/repos/Ketabuk/Ketabuk-Server/milestones/1';  // URL to github api


  getWebfrontMilestone (): Observable<any>
  {
      return this.http.get(this.githubWebfrontUrl)
                 .map(this.extractData)
                 .catch(this.handleError);
  }

  getServerMilestone (): Observable<any>
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
