import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Post }           from './post';
import { Observable }     from 'rxjs/Observable';
import { Config }         from './config';
import { SuperAuth }      from './super-auth';
import { SuperService }      from './super-service';

@Injectable()
export class PostService
{
  constructor (private http: SuperAuth) {}

  private postsUrl = Config.API_URL + 'journal';  // URL to web API

  getPosts(id: number): Observable<Post[]>
  {
    return this.http.get(this.postsUrl + '/' + id + '/post')
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(response: Response)
  {
    SuperService.extractData(response);
    let body = response.json();
    return body.posts || { };
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
