import { Response } from '@angular/http';
import { Config } from '../config';

export class SuperService
{
  public static extractData(response: Response)
  {
    let headers = response.headers;
    localStorage.setItem(Config.JWT_FIELD_NAME, headers.get('Authorization').split(" ", 2)[1]);
  }
}