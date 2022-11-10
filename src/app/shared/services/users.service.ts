import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, timeout } from 'rxjs/operators';
import { iResponseUser } from '../interfaces/user.interface';
import { appSettings } from '../settings/app-settings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: '',
  };

  constructor(private http: HttpClient, private configService: ConfigService) {}

  searchUser(user: string): Observable<iResponseUser> {
    return this.http
      .get<iResponseUser>(appSettings.URL_GITHUB + user, {
        headers: this._headers,
      })
      .pipe(
        retry(3),
        timeout(5000),
        catchError(this.configService.handleError)
      );
  }
}
