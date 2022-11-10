import { Injectable } from '@angular/core';
import { catchError, Observable, retry, timeout } from 'rxjs';
import { appSettings } from '../settings/app-settings';
import { HttpClient } from '@angular/common/http';
import { iReponseRepor } from './../interfaces/repor.interface';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class RepositoriesService {
  private _headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: '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',
  };

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getrepositories(user: string): Observable<iReponseRepor> {
    return this.http
      .get<iReponseRepor>(appSettings.URL_GITHUB + user + '/' + 'repos', {
        headers: this._headers,
      })
      .pipe(
        retry(3),
        timeout(5000),
        catchError(this.configService.handleError)
      );
  }
}
