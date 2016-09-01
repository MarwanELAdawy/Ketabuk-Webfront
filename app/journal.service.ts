import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Journal }           from './journal';
import { Observable }     from 'rxjs/Observable';
import { Config } from './config';
import { SuperAuth } from './super-auth';
import { SuperService } from './super-service';

@Injectable()
export class JournalService
{
  private jwt: string;
  constructor (private http: SuperAuth)
  {}

  private journalsUrl = Config.API_URL + 'journal';  // URL to web API

  getJournals (): Observable<Journal[]>
  {
    return this.http.get(this.journalsUrl)//, { headers: this.headers })
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getJournal (id: number): Observable<Journal>
  {
    return this.http.get(this.journalsUrl + '/' + id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getMyJournal()
  {
    
  }

  private extractData(response: Response)
  {
    SuperService.extractData(response);
    let body = response.json();
    return body.journals || body.journal || { };
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
