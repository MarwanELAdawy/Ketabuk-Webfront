import {Injectable} from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class SuperAuth {

    private jwt: string;

  constructor(private http: Http)
  {
      this.jwt = localStorage.getItem('id_token');
  }

  get(url)
  {
    this.jwt = localStorage.getItem('id_token');
    if(this.jwt == null)
        return this.http.get(url);
    return this.http.get(url + '?token=' + this.jwt);
        
  }

  post(url, data)
  {
    this.jwt = localStorage.getItem('id_token');
    if(this.jwt == null)
        return this.http.post(url, data, {});
    return this.http.post(url + '?token=' + this.jwt, data, {});
  }
}