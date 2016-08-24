import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class LoginService
{
  constructor (private http: Http) {}

  private loginUrl = 'https://api.ketabuk.dev/login';  // URL to web API

    login (credintials: string[]): Observable<void> {
        return this.http.post(this.loginUrl, credintials)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

  private extractData(response: Response)
  {
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
