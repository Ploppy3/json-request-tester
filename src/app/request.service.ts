import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Header, Request } from './data';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private _http: HttpClient) { }

  public processRequest(request: Request) {
    let httpOptions = {
      headers: this.formatHeaders(request.headers)
    };
    let httpRequest;
    switch (request.method) {
      case 'GET':
        httpRequest = this.get(request.url, httpOptions);
        break;
      default:
        console.warn('Unsupported HTTP Method')
        break;
    }
    if (!httpRequest) return;
    httpRequest.subscribe(
      res => {
        console.log(res);
        //check response
      },
      err => {
        console.log(err);
      }
    );
  }

  private get(url, httpOptions = {}) {
    return this._http.get(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  private formatHeaders(headers: Header[]): HttpHeaders {
    let header_params = {};
    Object.keys(headers).forEach(key => {
      header_params[key] = headers[key];
    });
    return new HttpHeaders(header_params);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('Something bad happened; please try again later.');
  };
}
