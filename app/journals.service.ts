import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Journal }           from './journal';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class JournalsService
{
  constructor (private http: Http) {}

  private journalsUrl = 'http://api.ketabuk.com/journal';  // URL to web API

  getJournals (): Observable<Journal[]>
  {
    return this.http.get(this.journalsUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(response: Response)
  {
    let body = response.json();
    return body.journals;// || { };
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
