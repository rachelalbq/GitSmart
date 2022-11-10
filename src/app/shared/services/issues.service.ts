import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, timeout } from 'rxjs';
import { appSettings } from '../settings/app-settings';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  private _headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: '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',
  };

  constructor(private http: HttpClient, private configService: ConfigService) {}

  searchIssues(user: string, repo: string): Observable<any> {
    return this.http
      .get<any>(appSettings.URL_ISSUES + user + '/' + repo + '/' + 'issues', {
        headers: this._headers,
      })
      .pipe(
        retry(3),
        timeout(5000),
        catchError(this.configService.handleError)
      );
  }
}
