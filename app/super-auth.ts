import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { Config } from './config';

@Injectable()
export class SuperAuth {

    private jwt: string;

  constructor(private http: Http)
  {
      this.jwt = localStorage.getItem(Config.JWT_FIELD_NAME);
  }

  get(url)
  {
    this.jwt = localStorage.getItem(Config.JWT_FIELD_NAME);
    if(this.jwt == null)
        return this.http.get(url);
    return this.http.get(url + '?token=' + this.jwt);
        
  }

  post(url, data)
  {
    this.jwt = localStorage.getItem(Config.JWT_FIELD_NAME);
    if(this.jwt == null)
        return this.http.post(url, data, {});
    return this.http.post(url + '?token=' + this.jwt, data, {});
  }

  public static isLoggedIn() : boolean
  {
    let jwt = localStorage.getItem(Config.JWT_FIELD_NAME);
    if(jwt == null)
        return false;
    return true;
  }

  public static logout()
  {
      localStorage.removeItem(Config.JWT_FIELD_NAME);
  }
}