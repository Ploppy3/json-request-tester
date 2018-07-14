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
    let httpRequest;
    let httpOptions = {
      headers: this.formatHeaders(request.headers)
    }
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
        console.log('error', err);
      }
    );
  }

  private get(url, httpOptions = {}) {
    return this._http.get(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  private formatHeaders(headers: Header[]) {
    let httpHeaders = new HttpHeaders();
    headers.forEach(header => {
      httpHeaders = httpHeaders.set(header.key, header.value);
    });
    return httpHeaders;
  }

  private handleError(error: HttpErrorResponse) {
    console.log('handleError', error);
    return throwError('Something bad happened; please try again later.');
  };
}
