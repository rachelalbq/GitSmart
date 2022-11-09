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
  constructor(private http: HttpClient) {}

  searchUser(user: string): Observable<iResponseUser> {
    return this.http
      .get<iResponseUser>(appSettings.URL_GITHUB + user)
      .pipe(retry(3), timeout(5000));
  }
}
