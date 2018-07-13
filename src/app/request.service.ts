import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Header } from './data';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private _http: HttpClient) { }

  public get (url, httpOptions = {}) {
    return this._http.get(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  public formatHeaders(headers: Header[]): HttpHeaders {
    let header_param = {};
    Object.keys(headers).forEach(key => {
      header_param[key] = headers[key];
    });
    return new HttpHeaders(header_param);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError( 'Something bad happened; please try again later.' );
  };
}
