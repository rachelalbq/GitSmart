import { Injectable } from '@angular/core';
import { Observable, retry, timeout } from 'rxjs';
import { appSettings } from '../settings/app-settings';
import { HttpClient } from '@angular/common/http';
import { iReponseRepor } from './../interfaces/repor.interface';

@Injectable({
  providedIn: 'root',
})
export class RepositoriesService {
  constructor(private http: HttpClient) {}

  getrepositories(user: string): Observable<iReponseRepor> {
    return this.http
      .get<iReponseRepor>(appSettings.URL_GITHUB + user + '/' + 'repos')
      .pipe(retry(3), timeout(5000));
  }
}
