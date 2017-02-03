import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Config } from '../config';
import { CanActivate, Router,
		 ActivatedRouteSnapshot,
		 RouterStateSnapshot }    from '@angular/router';
import { JwtHelper } from '../angular2-jwt';
import { User } from '../models/user';

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

  get(url: string)
  {
	if(SuperAuth.isLoggedIn())
		return this.http.get(this.attachToken(url));
	return this.http.get(url);
  }

  put(url: string, value: string)
  {
	  if(!SuperAuth.isLoggedIn())
		return;
	  let data = {_method: "PUT", data: value};
	  let body = JSON.stringify({ data });
	  let headers = new Headers({ 'Content-Type': 'application/json' });
	  let options = new RequestOptions({ headers: headers });
	  return this.http.post(this.attachToken(url), data, options);
  }

  delete(url: string)
  {
	  if(!SuperAuth.isLoggedIn())
		return;

	let data = {_method: "DELETE"};
	let body = JSON.stringify({ data });
	let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	
	return this.http.post(this.attachToken(url), data, options);
  }

  post(url: string, data: string, options = {})
  {
	if(SuperAuth.isLoggedIn())
		return this.http.post(this.attachToken(url), data, options);
	return this.http.post(url, data, options);
  }

  private attachToken(url: string) : string
  {
	  return url + '?token=' + SuperAuth.getJWT();
  }

  public static isLoggedIn() : boolean
  {
	let jwt = localStorage.getItem(Config.JWT_FIELD_NAME);

	if(jwt == null)
		return false;

	let helper = new JwtHelper;
	if (helper.isTokenExpired(jwt))
	{
		SuperAuth.logout();
		return false;
	}
	
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

  public static login(response: User)
  {
	  localStorage.setItem( Config.USER_FIELD, JSON.stringify(response) );
	  location.href = '/';
  }

  public static getAuthenticatedUser()
  {
	  let user = JSON.parse( localStorage.getItem(Config.USER_FIELD) );
	  if(user == null)
		return null
	  return user;
  }

  public static setAuthenticatedUser(user: User)
  {
	  localStorage.setItem(Config.USER_FIELD, JSON.stringify(user));
  }
}