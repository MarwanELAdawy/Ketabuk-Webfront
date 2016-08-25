import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Journal }           from './journal';
import { Observable }     from 'rxjs/Observable';
import { Config } from './config';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class LoginService
{

  constructor (private http: Http)
  {
  }

  private loginUrl = Config.API_URL + 'login';  // URL to web API

  login (p_credentials: string[]): Observable<string>
  {
    let credentials = new Credentials;
    credentials.email = p_credentials[0];
    credentials.password = p_credentials[1];
    let body = JSON.stringify({ credentials });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.loginUrl, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(response: Response)
  {
    let body = response.json();
    let headers = response.headers;
    Cookie.set('JWT', headers.get('Authorization'));
    return body;
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

class Credentials
{
    email: string;
    password: string;
}
