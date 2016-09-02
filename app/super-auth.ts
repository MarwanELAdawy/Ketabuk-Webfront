import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { Config } from './config';
import { CanActivate, Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';

@Injectable()
export class SuperAuth implements CanActivate
{

  constructor(private http: Http, private router: Router)
  {
  }

  public static getJWT() : string
  {
      return localStorage.getItem(Config.JWT_FIELD_NAME);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
      // if you're logged in and you try to access the login or register page you'll be redirected to /
    if (SuperAuth.isLoggedIn() && (route.url.toString() == 'login' || route.url.toString() == 'register'))
    {
        this.router.navigate(['/']);
        return false;
    }
    return true;
  }

  get(url)
  {
    if(SuperAuth.isLoggedIn())
        return this.http.get(url + '?token=' + SuperAuth.getJWT());
    return this.http.get(url);
        
  }

  post(url, data, options = {})
  {
    if(SuperAuth.isLoggedIn())
        return this.http.post(url + '?token=' + SuperAuth.getJWT(), data, options);
    return this.http.post(url, data, options);
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
      let fields = Config.ALL_FIELDS;
      fields.forEach(element => {
          localStorage.removeItem(element);
      });
      location.href = '/';
  }

  public static login(response)
  {
      localStorage.setItem( Config.USER_FIELD, JSON.stringify(response) );
      location.href = '/';
  }
}